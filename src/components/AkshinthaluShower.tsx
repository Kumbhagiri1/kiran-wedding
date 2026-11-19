"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart } from "lucide-react";

export function AkshinthaluShower() {
  const [blessingCount, setBlessingCount] = useState<number>(108);
  const [hasShowered, setHasShowered] = useState<boolean>(false);

  useEffect(() => {
    // Read cached blessing count or set initial auspicious count (108)
    const stored = localStorage.getItem("kiran_maheswari_blessings");
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= 108) {
        setBlessingCount(parsed);
      }
    }
  }, []);

  const triggerAkshinthalu = () => {
    setHasShowered(true);
    const newCount = blessingCount + 1;
    setBlessingCount(newCount);
    try {
      localStorage.setItem("kiran_maheswari_blessings", newCount.toString());
    } catch {}

    // Turmeric Gold, Marigold Orange, Crimson Rose, and Saffron Petals
    const colors = ["#C6A15B", "#E8D6AD", "#FFD700", "#FFB300", "#82263E", "#FF4500"];

    // First burst: Center spray of turmeric rice & petals
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.65 },
      colors: colors,
      shapes: ["circle", "square"],
      scalar: 0.8,
      ticks: 200,
    });

    // Secondary burst: Side flower showers
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });
    }, 200);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center my-6">
      <button
        onClick={triggerAkshinthalu}
        className="group relative inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#42101F] via-[#641B2E] to-[#42101F] border-2 border-gold-antique text-gold-champagne font-heading font-bold text-base tracking-widest uppercase shadow-gold-glow hover:shadow-royal hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-gold-antique/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Sparkles className="w-5 h-5 text-gold-antique animate-pulse group-hover:rotate-12 transition-transform" />
        <span>Shower Akshinthalu & Bless Couple</span>
        <Heart className="w-5 h-5 text-gold-champagne fill-gold-champagne group-hover:scale-110 transition-transform" />
      </button>

      <div className="mt-3 flex items-center space-x-2 text-xs text-darkText/80 font-body">
        <span className="text-gold-antique font-semibold">ॐ</span>
        <span>
          {hasShowered ? (
            <span className="text-maroon font-semibold">
              Thank you! Your heartfelt blessings have been showered.
            </span>
          ) : (
            <span>Click to virtually shower sacred turmeric rice & petals</span>
          )}
        </span>
        <span className="inline-block px-2 py-0.5 rounded-full bg-gold-champagne/40 text-maroon-deep font-ceremonial text-[11px] font-bold">
          {blessingCount.toLocaleString()} Blessings Bestowed
        </span>
      </div>
    </div>
  );
}
