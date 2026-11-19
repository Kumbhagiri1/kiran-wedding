"use client";

import React, { useState, useEffect } from "react";
import { GaneshaEmblem, KalashIcon, GoldDivider } from "./OrnamentalMotifs";
import { WEDDING_DATA } from "@/config/weddingData";
import { MailOpen, Sparkles, X } from "lucide-react";
import confetti from "canvas-confetti";

interface OpeningExperienceProps {
  onOpenComplete?: () => void;
}

export function OpeningExperience({ onOpenComplete }: OpeningExperienceProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Check if previously opened in current session
    try {
      const alreadyOpened = sessionStorage.getItem("kiran_wedding_envelope_opened");
      if (alreadyOpened === "true") {
        setIsDismissed(true);
        if (onOpenComplete) onOpenComplete();
      }
    } catch {}
  }, [onOpenComplete]);

  const triggerFlowerShower = () => {
    // Auspicious flower & Akshinthalu shower cascade
    const colors = ["#C6A15B", "#E8D6AD", "#FFD700", "#FFB300", "#82263E", "#FF4500"];
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: colors,
      shapes: ["circle", "square"],
      scalar: 0.9,
      ticks: 250,
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.65 },
        colors: colors,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.65 },
        colors: colors,
      });
    }, 250);
  };

  const completeDismissal = () => {
    setIsOpening(true);
    setIsOpen(true);
    triggerFlowerShower();
    try {
      sessionStorage.setItem("kiran_wedding_envelope_opened", "true");
    } catch {}
    setTimeout(() => {
      setIsDismissed(true);
      if (onOpenComplete) onOpenComplete();
    }, 500);
  };

  const handleOpen = () => {
    try {
      window.dispatchEvent(new CustomEvent("start-wedding-music"));
    } catch {}
    completeDismissal();
  };

  const handleSkip = () => {
    completeDismissal();
  };

  // Completely unmount once dismissed so it cannot interfere with scrolling or printing
  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isOpening ? "opacity-0 pointer-events-none scale-105" : "opacity-100 bg-[#42101F]/95"
      } backdrop-blur-md overflow-hidden`}
    >
      {/* Background radial gold pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(198,161,91,0.18)_0%,_rgba(42,11,20,0.98)_75%)] pointer-events-none" />

      {/* Floating subtle gold particle decorations */}
      <div className="absolute top-8 left-8 text-gold-antique/30 text-3xl font-serif select-none pointer-events-none animate-float-slow">
        ॐ
      </div>
      <div className="absolute bottom-8 right-8 text-gold-antique/30 text-3xl font-serif select-none pointer-events-none animate-float-slow">
        卐
      </div>

      {/* Royal Invitation Envelope Card */}
      <div
        className={`relative w-full max-w-xl bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EF] to-[#F5EBDD] text-darkText rounded-3xl border-4 border-gold-antique shadow-2xl p-6 sm:p-10 transition-transform duration-500 ${
          isOpening ? "scale-95 translate-y-3 opacity-60" : "scale-100"
        }`}
      >
        {/* Double Gold Inset Border */}
        <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-gold-antique/50 pointer-events-none" />
        <div className="absolute inset-3.5 sm:inset-4.5 rounded-xl border border-gold-antique/30 pointer-events-none" />

        {/* Skip Button Top Corner */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={handleSkip}
            className="text-xs font-heading font-medium tracking-wider text-maroon hover:text-maroon-dark uppercase px-3 py-1 rounded-full bg-cream-warm border border-gold-antique/50 hover:border-gold-antique transition-colors"
          >
            Skip Animation →
          </button>
        </div>

        {/* Top Auspicious Ganesha Invocation */}
        <div className="text-center pt-2">
          <div className="flex justify-center mb-2">
            <GaneshaEmblem className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          <h2 className="font-heading text-lg sm:text-2xl font-bold tracking-widest text-maroon">
            {WEDDING_DATA.openingBlessing}
          </h2>

          <p className="font-display italic text-xs sm:text-sm text-darkText/80 mt-1 max-w-md mx-auto">
            {WEDDING_DATA.openingSubBlessing}
          </p>

          <GoldDivider className="my-3 sm:my-4" symbol="om" />
        </div>

        {/* Royal Envelope Body */}
        <div className="text-center my-2 sm:my-4">
          <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-gold-dark font-semibold uppercase block mb-1">
            {WEDDING_DATA.invitationTitle}
          </span>

          <div className="my-4 space-y-1">
            <h1 className="font-heading font-bold text-2xl sm:text-4xl text-maroon-deep tracking-wider drop-shadow-sm">
              {WEDDING_DATA.groom.name}
            </h1>
            <div className="font-display italic text-gold-antique text-lg sm:text-2xl font-semibold">
              &
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-4xl text-maroon-deep tracking-wider drop-shadow-sm">
              {WEDDING_DATA.bride.name}
            </h1>
          </div>

          {/* Couple Photo in Royal Gold Frame */}
          {WEDDING_DATA.coupleImage && (
            <div className="my-3 flex justify-center">
              <div className="relative w-44 h-32 sm:w-52 sm:h-36 rounded-2xl border-2 border-gold-antique p-1 shadow-royal bg-gradient-to-b from-[#42101F] to-[#2A0B14] overflow-hidden group">
                <img
                  src={WEDDING_DATA.coupleImage}
                  alt={`${WEDDING_DATA.groom.name} & ${WEDDING_DATA.bride.name}`}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                />
                <div className="absolute inset-1 rounded-xl border border-gold-champagne/40 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Date Badge */}
          <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full border border-gold-antique bg-cream-warm shadow-inner my-2">
            <span className="w-2 h-2 rounded-full bg-maroon" />
            <span className="font-ceremonial text-sm sm:text-base font-bold text-maroon tracking-widest">
              {WEDDING_DATA.eventDateDisplay}
            </span>
            <span className="w-2 h-2 rounded-full bg-maroon" />
          </div>

          <div className="text-[11px] font-ceremonial text-gold-dark font-semibold tracking-wider uppercase mt-1">
            Two-Day Celebrations • 01 & 02 December 2026
          </div>
        </div>

        {/* Royal Wax Seal & Open Action */}
        <div className="mt-6 text-center flex flex-col items-center">
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="group relative flex items-center space-x-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#641B2E] via-[#82263E] to-[#641B2E] border-2 border-gold-antique text-gold-champagne font-heading font-bold text-base sm:text-lg tracking-widest uppercase shadow-gold-glow hover:shadow-royal hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <MailOpen className="w-5 h-5 text-gold-champagne group-hover:rotate-6 transition-transform" />
            <span>Open Royal Invitation</span>
            <Sparkles className="w-4 h-4 text-gold-antique" />
          </button>

          <span className="text-[11px] text-darkText/60 tracking-wider font-body mt-2.5">
            Click to unseal and view the complete ceremonial invitation
          </span>
        </div>
      </div>
    </div>
  );
}
