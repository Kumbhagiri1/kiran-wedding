"use client";

import React from "react";
import { WEDDING_DATA, EventScheduleItem } from "@/config/weddingData";
import { GoldDivider, CornerFlourish, MarigoldFlower, HaldiTurmericBowl, KalashIcon } from "./OrnamentalMotifs";
import { Calendar, Clock, MapPin, Navigation, Sparkles, Music2, Star, CheckCircle } from "lucide-react";

export function TwoDaySchedule() {
  const { schedule } = WEDDING_DATA;
  const haldiEvent = schedule.events[0];
  const weddingEvent = schedule.events[1];

  const handleDownloadIcs = (event: EventScheduleItem) => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Kumbhagiri Wedding//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${event.calendar.title}`,
      `DESCRIPTION:${event.calendar.description}`,
      `LOCATION:${event.calendar.location}`,
      `DTSTART:${event.calendar.startDate}`,
      `DTEND:${event.calendar.endDate}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", event.calendar.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getGoogleCalendarUrl = (event: EventScheduleItem) => {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.calendar.title
    )}&dates=${event.calendar.startDate}/${event.calendar.endDate}&details=${encodeURIComponent(
      event.calendar.description
    )}&location=${encodeURIComponent(event.calendar.location)}`;
  };

  return (
    <section id="itinerary" className="relative py-16 sm:py-24 px-4 bg-cream-ivory text-darkText overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#641B2E_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-maroon font-semibold uppercase block">
            Sacred Auspicious Schedule
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-maroon-deep tracking-wider mt-2">
            {schedule.sectionTitle}
          </h2>
          <p className="font-body text-sm sm:text-base text-darkText/80 max-w-2xl mx-auto mt-2">
            {schedule.subTitle}
          </p>
          <GoldDivider className="my-4" symbol="lotus" />
        </div>

        {/* Two-Event Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* EVENT 1: HALDI & MUSIC CEREMONY */}
          <div className="relative bg-gradient-to-b from-[#FFFDF2] via-[#FEF9E7] to-[#FDF4D4] border-2 border-amber-400/80 rounded-3xl p-6 sm:p-10 shadow-royal flex flex-col justify-between overflow-hidden group">
            {/* Corner Decorative Accents */}
            <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
            <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
            <div className="absolute bottom-2 left-2"><CornerFlourish position="bl" /></div>
            <div className="absolute bottom-2 right-2"><CornerFlourish position="br" /></div>

            {/* Inset Border with Warm Amber Accent */}
            <div className="absolute inset-3 rounded-2xl border border-amber-300/50 pointer-events-none" />

            <div>
              {/* Event Badge with Marigold Accent */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-400 text-amber-950 font-ceremonial text-[11px] font-bold tracking-wider uppercase shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{haldiEvent.badge}</span>
                </span>
                <MarigoldFlower className="w-8 h-8 text-amber-600 animate-spin-very-slow" />
              </div>

              {/* Event Title */}
              <div className="text-center my-3">
                <div className="flex justify-center mb-2">
                  <HaldiTurmericBowl className="w-12 h-12" />
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-amber-950 tracking-wider">
                  {haldiEvent.title}
                </h3>
                <p className="font-display italic text-amber-800 text-sm mt-1">
                  {haldiEvent.eventName}
                </p>
              </div>

              {/* Date & Guest Arrival Time Card */}
              <div className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#FEF08A]/60 via-[#FDE047]/40 to-[#FEF08A]/60 border-2 border-amber-400/80 shadow-inner text-center">
                <div className="flex items-center justify-center space-x-2 text-amber-900 font-ceremonial text-xs uppercase tracking-widest font-bold">
                  <Calendar className="w-4 h-4 text-amber-700" />
                  <span>{haldiEvent.day}</span>
                </div>

                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-950 my-1">
                  {haldiEvent.date}
                </div>

                {/* Highlighted Guest Arrival Time Notice */}
                <div className="mt-3 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-amber-500 text-white font-heading font-bold text-sm tracking-wide shadow-md">
                  <Clock className="w-4 h-4 text-amber-100" />
                  <span>Guest Arrival: 04:00 PM</span>
                </div>

                <p className="mt-2 text-xs font-semibold text-amber-950 font-body">
                  ★ We warmly invite you to arrive by 4:00 PM and celebrate this special evening with us! ★
                </p>
              </div>

              {/* Invitation Message */}
              <div className="space-y-3 font-body text-sm sm:text-base text-amber-950/90 text-center max-w-md mx-auto my-4">
                <p className="italic font-display text-amber-900 text-base sm:text-lg">
                  &ldquo;{haldiEvent.descriptionParagraphs[0]}&rdquo;
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-darkText/80">
                  {haldiEvent.descriptionParagraphs[1]}
                </p>
                <p className="text-xs sm:text-sm text-darkText/80">
                  {haldiEvent.descriptionParagraphs[2]}
                </p>
              </div>

              {/* Venue Address Info */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 text-left my-4">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-amber-950 uppercase tracking-wide">
                      Venue: {haldiEvent.venueName}
                    </h4>
                    <p className="font-body text-xs text-darkText/80 mt-0.5">
                      {haldiEvent.venueAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event 1 Action Buttons */}
            <div className="pt-4 border-t border-amber-300/80 flex flex-wrap items-center justify-center gap-2.5">
              <a
                href={getGoogleCalendarUrl(haldiEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:scale-105"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add Haldi to Calendar</span>
              </a>

              <button
                onClick={() => handleDownloadIcs(haldiEvent)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-400 text-amber-950 font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:scale-105"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-800" />
                <span>Download .ics</span>
              </button>

              <a
                href={haldiEvent.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-white hover:bg-amber-50 border border-amber-400 text-amber-950 font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:scale-105"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-700" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* EVENT 2: SACRED WEDDING CEREMONY */}
          <div className="relative bg-gradient-to-b from-[#42101F] via-[#641B2E] to-[#2A0B14] border-2 border-gold-antique rounded-3xl p-6 sm:p-10 shadow-royal flex flex-col justify-between overflow-hidden text-cream-ivory group">
            {/* Corner Decorative Accents */}
            <div className="absolute top-2 left-2"><CornerFlourish position="tl" /></div>
            <div className="absolute top-2 right-2"><CornerFlourish position="tr" /></div>
            <div className="absolute bottom-2 left-2"><CornerFlourish position="bl" /></div>
            <div className="absolute bottom-2 right-2"><CornerFlourish position="br" /></div>

            {/* Inset Border with Gold Accent */}
            <div className="absolute inset-3 rounded-2xl border border-gold-champagne/20 pointer-events-none" />

            <div>
              {/* Event Badge with Royal Gold Accent */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-[#42101F] border border-gold-antique text-gold-champagne font-ceremonial text-[11px] font-bold tracking-wider uppercase shadow-gold-subtle">
                  <Star className="w-3.5 h-3.5 text-gold-antique" />
                  <span>{weddingEvent.badge}</span>
                </span>
                <KalashIcon className="w-8 h-8 text-gold-antique" />
              </div>

              {/* Event Title */}
              <div className="text-center my-3">
                <div className="flex justify-center mb-2">
                  <span className="w-12 h-12 rounded-full bg-[#42101F] border border-gold-antique flex items-center justify-center text-gold-champagne font-heading font-bold text-xl shadow-gold-subtle">
                    ॐ
                  </span>
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gold-light tracking-wider">
                  {weddingEvent.title}
                </h3>
                <p className="font-display italic text-gold-antique text-sm mt-1">
                  {weddingEvent.eventName}
                </p>
              </div>

              {/* Date & Auspicious Muhurtham Window Card */}
              <div className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#2A0B14]/90 to-[#1A050B] border-2 border-gold-antique/70 shadow-inner text-center">
                <div className="flex items-center justify-center space-x-2 text-gold-champagne font-ceremonial text-xs uppercase tracking-widest font-bold">
                  <Calendar className="w-4 h-4 text-gold-antique" />
                  <span>{weddingEvent.day}</span>
                </div>

                <div className="font-heading font-extrabold text-2xl sm:text-3xl text-gold-light my-1">
                  {weddingEvent.date}
                </div>

                {/* Highlighted Muhurtham Timing */}
                <div className="mt-3 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-dark to-gold-antique text-maroon-dark font-heading font-bold text-sm tracking-wide shadow-gold-subtle">
                  <Clock className="w-4 h-4 text-maroon-dark" />
                  <span>Auspicious Muhurtham: 09:04 AM – 09:37 AM</span>
                </div>

                {/* Panchangam Breakdown */}
                {weddingEvent.panchangam && (
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] font-ceremonial text-cream-warm/90">
                    <span className="px-2 py-0.5 rounded bg-[#42101F] border border-gold-antique/30">
                      {weddingEvent.panchangam.nakshatra}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#42101F] border border-gold-antique/30">
                      {weddingEvent.panchangam.tithi}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#42101F] border border-gold-antique/30">
                      {weddingEvent.panchangam.lagna}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-3 font-body text-sm sm:text-base text-cream-warm/90 text-center max-w-md mx-auto my-4">
                <p className="text-xs sm:text-sm leading-relaxed">
                  {weddingEvent.descriptionParagraphs[0]}
                </p>
                <p className="text-xs sm:text-sm text-gold-champagne/80">
                  {weddingEvent.descriptionParagraphs[1]}
                </p>
              </div>

              {/* Venue Address Info */}
              <div className="p-3.5 rounded-xl bg-[#2A0B14]/70 border border-gold-antique/30 text-left my-4">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-5 h-5 text-gold-antique flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-gold-champagne uppercase tracking-wide">
                      Venue: {weddingEvent.venueName}
                    </h4>
                    <p className="font-body text-xs text-cream-warm/80 mt-0.5">
                      {weddingEvent.venueAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event 2 Action Buttons */}
            <div className="pt-4 border-t border-gold-antique/30 flex flex-wrap items-center justify-center gap-2.5">
              <a
                href={getGoogleCalendarUrl(weddingEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-gold-dark to-gold-antique text-maroon-dark font-heading font-bold text-xs tracking-wider uppercase transition-all shadow-gold-subtle hover:scale-105"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Add Wedding to Calendar</span>
              </a>

              <button
                onClick={() => handleDownloadIcs(weddingEvent)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#42101F] hover:bg-[#641B2E] border border-gold-antique text-gold-champagne font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:scale-105"
              >
                <Calendar className="w-3.5 h-3.5 text-gold-antique" />
                <span>Download .ics</span>
              </button>

              <a
                href={weddingEvent.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#2A0B14] hover:bg-[#42101F] border border-gold-antique/70 text-gold-champagne font-heading font-semibold text-xs tracking-wider uppercase transition-all shadow-sm hover:scale-105"
              >
                <Navigation className="w-3.5 h-3.5 text-gold-antique" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
