"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDateIso: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function CountdownTimer({ targetDateIso }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(targetDateIso).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso]);

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto my-6 opacity-50">
        {["Days", "Hours", "Minutes", "Seconds"].map((u) => (
          <div key={u} className="bg-[#42101F]/80 p-3 sm:p-4 rounded-lg border border-gold-antique/40 text-center">
            <span className="font-heading text-2xl sm:text-4xl text-gold-champagne font-bold">--</span>
            <span className="block text-[10px] sm:text-xs text-cream-warm tracking-wider uppercase">{u}</span>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.isPast) {
    return (
      <div className="my-6 p-4 rounded-xl border border-gold-antique bg-[#42101F] text-center text-gold-champagne font-heading text-lg">
        ✨ The Sacred Muhurtham is Solemnised. May the Couple Be Blessed Forever! ✨
      </div>
    );
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="my-6">
      <div className="flex items-center justify-center space-x-2 mb-3 text-gold-champagne/90 text-xs sm:text-sm font-ceremonial tracking-widest uppercase">
        <Clock className="w-4 h-4 text-gold-antique animate-pulse" />
        <span>Countdown to Auspicious Muhurtham</span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto">
        {timeUnits.map((item) => (
          <div
            key={item.label}
            className="relative bg-gradient-to-b from-[#42101F] to-[#2A0B14] p-3 sm:p-4 rounded-xl border border-gold-antique/60 shadow-royal text-center overflow-hidden group"
          >
            {/* Top gold bar accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-antique to-transparent" />

            <div className="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl text-gold-champagne tracking-tight group-hover:scale-105 transition-transform">
              {String(item.value).padStart(2, "0")}
            </div>

            <div className="text-[10px] sm:text-xs font-display tracking-widest uppercase text-cream-ivory/80 mt-1">
              {item.label}
            </div>

            {/* Corner subtle rivets */}
            <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-gold-antique/40" />
            <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-gold-antique/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
