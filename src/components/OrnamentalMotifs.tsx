import React from "react";

export function GaneshaEmblem({
  className = "w-16 h-16",
  alt = "Lord Ganesha Sacred Symbol",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/ganesha-gold.png"
      alt={alt}
      className={`inline-block object-contain filter drop-shadow-[0_2px_10px_rgba(198,161,91,0.45)] select-none pointer-events-none transition-transform hover:scale-105 duration-300 ${className}`}
      loading="eager"
    />
  );
}

export function KalashIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Auspicious Kalash"
    >
      <defs>
        <linearGradient id="goldK" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C6A15B" />
          <stop offset="50%" stopColor="#E8D6AD" />
          <stop offset="100%" stopColor="#9E7B36" />
        </linearGradient>
      </defs>
      {/* Coconut on top */}
      <ellipse cx="40" cy="24" rx="8" ry="10" fill="url(#goldK)" stroke="#641B2E" strokeWidth="0.75" />
      {/* Mango Leaves */}
      <path d="M40 24 C30 18, 22 24, 20 30 C26 30, 32 28, 38 27 Z" fill="#C6A15B" opacity="0.8" />
      <path d="M40 24 C50 18, 58 24, 60 30 C54 30, 48 28, 42 27 Z" fill="#C6A15B" opacity="0.8" />
      <path d="M40 18 C36 10, 44 10, 40 4 C36 10, 44 10, 40 18 Z" fill="url(#goldK)" />
      {/* Kalash Neck */}
      <path d="M30 32 L50 32 L48 38 L32 38 Z" fill="url(#goldK)" stroke="#641B2E" strokeWidth="0.5" />
      {/* Pot Body */}
      <path
        d="M32 38 C22 42, 18 52, 22 62 C26 70, 34 72, 40 72 C46 72, 54 70, 58 62 C62 52, 58 42, 48 38 Z"
        fill="url(#goldK)"
        stroke="#641B2E"
        strokeWidth="1"
      />
      {/* Swastika / Auspicious Mark on Pot */}
      <path
        d="M40 48 L40 60 M34 54 L46 54 M34 48 L34 54 M46 54 L46 60 M34 60 L40 60 M40 48 L46 48"
        stroke="#641B2E"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      {/* Base */}
      <path d="M28 72 L52 72 L48 76 L32 76 Z" fill="url(#goldK)" />
    </svg>
  );
}

export function RoyalArch({ className = "w-full max-w-xl h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C6A15B" stopOpacity="0" />
          <stop offset="25%" stopColor="#C6A15B" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FFF9EF" />
          <stop offset="75%" stopColor="#C6A15B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C6A15B" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Top Ornamental Arc */}
      <path
        d="M0 50 Q 150 10, 300 8 Q 450 10, 600 50"
        stroke="url(#archGold)"
        strokeWidth="1.5"
      />
      <path
        d="M40 55 Q 180 16, 300 15 Q 420 16, 560 55"
        stroke="url(#archGold)"
        strokeWidth="0.75"
        strokeDasharray="4 2"
      />
      {/* Center Crest / Kalash ornament */}
      <circle cx="300" cy="10" r="5" fill="#C6A15B" />
      <circle cx="300" cy="10" r="2" fill="#641B2E" />
      <path d="M295 10 C295 4, 305 4, 305 10" stroke="#FFF9EF" strokeWidth="1" />
      {/* Small decorative bells / beads */}
      <circle cx="200" cy="22" r="2.5" fill="#C6A15B" />
      <circle cx="250" cy="15" r="2.5" fill="#C6A15B" />
      <circle cx="350" cy="15" r="2.5" fill="#C6A15B" />
      <circle cx="400" cy="22" r="2.5" fill="#C6A15B" />
    </svg>
  );
}

export function GoldDivider({ className = "my-8", symbol = "lotus" }: { className?: string; symbol?: "lotus" | "om" | "star" | "kalash" }) {
  return (
    <div className={`flex items-center justify-center space-x-3 ${className}`}>
      <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-[#C6A15B] to-[#C6A15B]" />
      <div className="flex items-center space-x-1.5 text-gold-antique">
        <span className="text-[10px] sm:text-xs tracking-widest opacity-80">❖</span>
        {symbol === "lotus" && (
          <svg className="w-5 h-5 text-gold-antique" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 10 7 10 10C10 11.5 11 12.5 12 13C13 12.5 14 11.5 14 10C14 7 12 2 12 2ZM6.5 7.5C6.5 7.5 7 11.5 8.5 13C9.5 14 11 14 12 13.5C10.5 12.5 9 10 9 7.5C8 7.5 7 7.5 6.5 7.5ZM17.5 7.5C17 7.5 16 7.5 15 7.5C15 10 13.5 12.5 12 13.5C13 14 14.5 14 15.5 13C17 11.5 17.5 7.5 17.5 7.5ZM4 13C4 13 5.5 17 9 18C10.5 18.5 11.5 17.5 12 16.5C10 16 8 14.5 7 13C6 13 4.5 13 4 13ZM20 13C19.5 13 18 13 17 13C16 14.5 14 16 12 16.5C12.5 17.5 13.5 18.5 15 18C18.5 17 20 13 20 13ZM12 18.5C10 18.5 7.5 19.5 6 22H18C16.5 19.5 14 18.5 12 18.5Z" />
          </svg>
        )}
        {symbol === "om" && (
          <span className="font-serif font-bold text-base text-gold-antique px-1">ॐ</span>
        )}
        {symbol === "star" && (
          <span className="text-gold-antique text-sm">✦</span>
        )}
        {symbol === "kalash" && (
          <span className="text-gold-antique text-xs font-serif">॥ 卐 ॥</span>
        )}
        <span className="text-[10px] sm:text-xs tracking-widest opacity-80">❖</span>
      </div>
      <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-l from-transparent via-[#C6A15B] to-[#C6A15B]" />
    </div>
  );
}

export function CornerFlourish({
  position = "tl",
  className = "",
}: {
  position: "tl" | "tr" | "bl" | "br";
  className?: string;
}) {
  const rotationClass = {
    tl: "",
    tr: "rotate-90",
    br: "rotate-180",
    bl: "-rotate-90",
  }[position];

  return (
    <svg
      className={`w-8 h-8 sm:w-12 sm:h-12 text-gold-antique opacity-70 pointer-events-none transform ${rotationClass} ${className}`}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2 L2 35 C2 25, 10 18, 20 18 L35 18 M2 2 L35 2 C25 2, 18 10, 18 20 L18 35"
        stroke="#C6A15B"
        strokeWidth="1.5"
      />
      <circle cx="6" cy="6" r="2.5" fill="#C6A15B" />
      <path
        d="M10 2 C10 10, 2 10, 2 10"
        stroke="#E8D6AD"
        strokeWidth="1"
      />
      <circle cx="20" cy="20" r="1.5" fill="#641B2E" />
    </svg>
  );
}

export function RoyalMonogramPlaceholder({
  initials = "SK & GM",
  label = "Kiran & Maheswari",
  gender = "couple",
}: {
  initials?: string;
  label?: string;
  gender?: "groom" | "bride" | "couple";
}) {
  return (
    <div className="relative w-48 h-56 sm:w-56 sm:h-64 mx-auto rounded-t-full border-2 border-gold-antique/70 bg-gradient-to-b from-[#42101F] via-[#641B2E] to-[#2A0B14] p-3 shadow-royal flex flex-col items-center justify-center text-center overflow-hidden group">
      {/* Ornate Arch Inset */}
      <div className="absolute inset-2 rounded-t-full border border-gold-champagne/30 pointer-events-none" />
      
      {/* Background Mandala Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg className="w-56 h-56 animate-spin-very-slow text-gold-champagne" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="3 3" />
          <path d="M50 0 L55 35 L90 15 L65 45 L100 50 L65 55 L90 85 L55 65 L50 100 L45 65 L10 85 L35 55 L0 50 L35 45 L10 15 L45 35 Z" />
        </svg>
      </div>

      {/* Decorative Icon */}
      <div className="mb-2 relative z-10">
        {gender === "groom" && (
          <div className="w-14 h-14 rounded-full border border-gold-antique/60 bg-[#42101F] flex items-center justify-center text-gold-champagne shadow-gold-subtle">
            {/* Turban / Pagdi Silhouette Icon */}
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3C8 3 5 6 5 9C5 11 6 12 7 13C6 14 5 15 5 17C5 19 8 20 12 20C16 20 19 19 19 17C19 15 18 14 17 13C18 12 19 11 19 9C19 6 16 3 12 3Z" />
              <path d="M12 3V9" />
              <path d="M9 13H15" />
              <circle cx="12" cy="7" r="1.5" fill="#C6A15B" />
            </svg>
          </div>
        )}
        {gender === "bride" && (
          <div className="w-14 h-14 rounded-full border border-gold-antique/60 bg-[#42101F] flex items-center justify-center text-gold-champagne shadow-gold-subtle">
            {/* Maang Tikka / Ornate Bridal Veil Icon */}
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2V8" stroke="#C6A15B" strokeWidth="2" />
              <circle cx="12" cy="10" r="3" fill="#C6A15B" />
              <path d="M5 14C5 10 8 7 12 7C16 7 19 10 19 14C19 18 15 21 12 21C9 21 5 18 5 14Z" stroke="currentColor" />
              <path d="M8 17C10 19 14 19 16 17" />
            </svg>
          </div>
        )}
        {gender === "couple" && (
          <div className="w-14 h-14 rounded-full border border-gold-antique/60 bg-[#42101F] flex items-center justify-center text-gold-champagne shadow-gold-subtle">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        )}
      </div>

      {/* Royal Monogram Initials */}
      <div className="relative z-10 font-heading text-2xl sm:text-3xl font-bold tracking-widest text-gold-champagne drop-shadow">
        {initials}
      </div>

      <div className="h-[1px] w-16 bg-gold-antique/40 my-2" />

      {/* Label */}
      <p className="relative z-10 font-display text-xs text-cream-ivory/80 tracking-wider uppercase px-2">
        {label}
      </p>

      {/* Subtle bottom note */}
      <span className="relative z-10 text-[9px] text-gold-antique/60 tracking-widest mt-2 uppercase">
        Royal Portrait Placeholder
      </span>
    </div>
  );
}

export function LotusPetalPattern() {
  return (
    <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:20px_20px]" />
  );
}

export function MarigoldFlower({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Auspicious Marigold Flower"
    >
      <defs>
        <radialGradient id="marigoldGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="25%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>
      {/* Outer Petal Ring */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <circle
          key={deg}
          cx={30 + 16 * Math.cos((deg * Math.PI) / 180)}
          cy={30 + 16 * Math.sin((deg * Math.PI) / 180)}
          r="8"
          fill="url(#marigoldGrad)"
          opacity="0.9"
        />
      ))}
      {/* Middle Petal Ring */}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
        <circle
          key={deg}
          cx={30 + 10 * Math.cos((deg * Math.PI) / 180)}
          cy={30 + 10 * Math.sin((deg * Math.PI) / 180)}
          r="6.5"
          fill="#F59E0B"
        />
      ))}
      {/* Flower Center */}
      <circle cx="30" cy="30" r="7.5" fill="#B45309" />
      <circle cx="30" cy="30" r="4.5" fill="#FEF3C7" />
    </svg>
  );
}

export function HaldiTurmericBowl({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Traditional Haldi Cup"
    >
      <defs>
        <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* Golden Turmeric Mound */}
      <ellipse cx="32" cy="28" rx="16" ry="10" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
      <circle cx="32" cy="24" r="5" fill="#FEF08A" />
      {/* Brass Bowl */}
      <path
        d="M12 28 C12 44, 20 52, 32 52 C44 52, 52 44, 52 28 Z"
        fill="url(#brassGrad)"
        stroke="#B45309"
        strokeWidth="1.5"
      />
      {/* Bowl Rim */}
      <ellipse cx="32" cy="28" rx="20" ry="4" fill="none" stroke="#B45309" strokeWidth="1.5" />
      {/* Stand Base */}
      <path d="M24 52 L40 52 L44 58 L20 58 Z" fill="url(#brassGrad)" stroke="#B45309" strokeWidth="1" />
      {/* Auspicious Kumkum Tilak dot on bowl */}
      <circle cx="32" cy="40" r="3" fill="#641B2E" />
    </svg>
  );
}

