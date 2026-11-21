"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GoldDivider, CornerFlourish } from "./OrnamentalMotifs";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  Heart,
  Sparkles,
  Maximize2,
  ZoomIn,
} from "lucide-react";

export interface GalleryPhoto {
  id: string;
  src: string;
  srcJpg: string;
  titleEn: string;
  titleTe: string;
  subtitle: string;
  aspect: "portrait" | "landscape";
  category: "together" | "groom" | "bride" | "scenic";
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-01",
    src: "/images/gallery/photo-01.webp",
    srcJpg: "/images/gallery/photo-01.jpg",
    titleEn: "Divine Harmony",
    titleTe: "దివ్య బంధం",
    subtitle: "Together in royal plum and purple ethnic elegance, radiating grace and warmth.",
    aspect: "portrait",
    category: "together",
  },
  {
    id: "photo-02",
    src: "/images/gallery/photo-02.webp",
    srcJpg: "/images/gallery/photo-02.jpg",
    titleEn: "Playful Whispers",
    titleTe: "చిరునవ్వుల వేళ",
    subtitle: "Sharing joyful moments and innocent laughter under the garden canopy.",
    aspect: "portrait",
    category: "together",
  },
  {
    id: "photo-03",
    src: "/images/gallery/photo-03.webp",
    srcJpg: "/images/gallery/photo-03.jpg",
    titleEn: "Sacred Embrace",
    titleTe: "అనురాగ బంధం",
    subtitle: "Warmth, protection, and unconditional love inside the peaceful forest gazebo.",
    aspect: "landscape",
    category: "together",
  },
  {
    id: "photo-04",
    src: "/images/gallery/photo-04.webp",
    srcJpg: "/images/gallery/photo-04.jpg",
    titleEn: "Walking into Forever",
    titleTe: "ఏడు అడుగుల దిశగా",
    subtitle: "Hand in hand along nature’s scenic trail, stepping towards lifelong companionship.",
    aspect: "landscape",
    category: "together",
  },
  {
    id: "photo-05",
    src: "/images/gallery/photo-05.webp",
    srcJpg: "/images/gallery/photo-05.jpg",
    titleEn: "Heartfelt Companionship",
    titleTe: "తోడు నీడగా",
    subtitle: "A tranquil back-to-back moment on emerald green grass, speaking the language of silence.",
    aspect: "landscape",
    category: "together",
  },
  {
    id: "photo-06",
    src: "/images/gallery/photo-06.webp",
    srcJpg: "/images/gallery/photo-06.jpg",
    titleEn: "The Royal Groom",
    titleTe: "రాజసం ఉట్టిపడే పెళ్లికొడుకు",
    subtitle: "Ch. Kumbhagiri Sai Kiran in ceremonial royal attire, awaiting his bride with pride.",
    aspect: "landscape",
    category: "groom",
  },
  {
    id: "photo-07",
    src: "/images/gallery/photo-07.webp",
    srcJpg: "/images/gallery/photo-07.jpg",
    titleEn: "Gently Leaning on You",
    titleTe: "నమ్మకమైన ఆధారం",
    subtitle: "Resting gently on his shoulder—a tender vow of lifelong trust and serenity.",
    aspect: "landscape",
    category: "together",
  },
  {
    id: "photo-08",
    src: "/images/gallery/photo-08.webp",
    srcJpg: "/images/gallery/photo-08.jpg",
    titleEn: "Golden Sunshine",
    titleTe: "మంగళకరమైన తేజస్సు",
    subtitle: "A picture of timeless tradition and joy under the wooden pagoda surrounded by hills.",
    aspect: "landscape",
    category: "together",
  },
  {
    id: "photo-09",
    src: "/images/gallery/photo-09.webp",
    srcJpg: "/images/gallery/photo-09.jpg",
    titleEn: "Elegance & Tradition",
    titleTe: "సాంప్రదాయ శోభ",
    subtitle: "A majestic portrait amidst lush bamboo, symbolizing strength, flexibility, and harmony.",
    aspect: "portrait",
    category: "together",
  },
  {
    id: "photo-10",
    src: "/images/gallery/photo-10.webp",
    srcJpg: "/images/gallery/photo-10.jpg",
    titleEn: "Under the Auspicious Pergola",
    titleTe: "శుభారంభం",
    subtitle: "Looking upwards to the skies, seeking heavenly blessings for their new beginning.",
    aspect: "landscape",
    category: "scenic",
  },
  {
    id: "photo-11",
    src: "/images/gallery/photo-11.webp",
    srcJpg: "/images/gallery/photo-11.jpg",
    titleEn: "The Road to Eternity",
    titleTe: "అనంతమైన ప్రయాణం",
    subtitle: "Together on the wide open road against majestic hills, ready for life's grand journey.",
    aspect: "landscape",
    category: "scenic",
  },
  {
    id: "photo-12",
    src: "/images/gallery/photo-12.webp",
    srcJpg: "/images/gallery/photo-12.jpg",
    titleEn: "The Radiant Bride",
    titleTe: "సౌభాగ్యవతి పెళ్లికూతురు",
    subtitle: "Ch. Sou. Gangalla Maheswari in serene grace, adorned in traditional ethnic beauty.",
    aspect: "portrait",
    category: "bride",
  },
];

export function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "together" | "portraits">("all");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeFilter === "together") return photo.category === "together";
    if (activeFilter === "portraits") return photo.aspect === "portrait";
    return true;
  });

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1) : null
        );
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1) : null
        );
      }
    },
    [selectedIndex]
  );

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handleKeyDown]);

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === GALLERY_PHOTOS.length - 1 ? 0 : prev + 1) : null
    );
  };

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === 0 ? GALLERY_PHOTOS.length - 1 : prev - 1) : null
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext(); // Swiped left -> next
      } else {
        handlePrev(); // Swiped right -> prev
      }
    }
    setTouchStartX(null);
  };

  const activePhoto = selectedIndex !== null ? GALLERY_PHOTOS[selectedIndex] : null;

  return (
    <section
      id="gallery"
      className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#2A0B14] via-[#3B0E1B] to-[#2A0B14] text-cream-ivory overflow-hidden"
    >
      {/* Background Motifs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-antique/50 bg-[#42101F]/80 text-gold-champagne font-ceremonial text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-3 shadow-royal">
            <Camera className="w-3.5 h-3.5 text-gold-antique" />
            <span>॥ మధుర క్షణాలు • CHERISHED MOMENTS ॥</span>
            <Sparkles className="w-3.5 h-3.5 text-gold-antique" />
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-5xl text-gold-champagne tracking-wider">
            Pre-Wedding Photo Gallery
          </h2>

          <p className="font-display italic text-gold-antique/90 text-sm sm:text-lg max-w-2xl mx-auto mt-2">
            A celebration of love, companionship, and joyous beginnings for{" "}
            <span className="text-gold-champagne font-semibold not-italic">
              Sai Kiran & Maheswari
            </span>
          </p>

          <GoldDivider className="my-4" symbol="lotus" />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-dark shadow-gold-subtle scale-105"
                  : "bg-[#641B2E]/60 text-cream-warm border border-gold-antique/40 hover:bg-[#641B2E] hover:text-gold-champagne"
              }`}
            >
              All Photos ({GALLERY_PHOTOS.length})
            </button>
            <button
              onClick={() => setActiveFilter("together")}
              className={`px-4 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider transition-all duration-300 ${
                activeFilter === "together"
                  ? "bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-dark shadow-gold-subtle scale-105"
                  : "bg-[#641B2E]/60 text-cream-warm border border-gold-antique/40 hover:bg-[#641B2E] hover:text-gold-champagne"
              }`}
            >
              Couple Moments (8)
            </button>
            <button
              onClick={() => setActiveFilter("portraits")}
              className={`px-4 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider transition-all duration-300 ${
                activeFilter === "portraits"
                  ? "bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-dark shadow-gold-subtle scale-105"
                  : "bg-[#641B2E]/60 text-cream-warm border border-gold-antique/40 hover:bg-[#641B2E] hover:text-gold-champagne"
              }`}
            >
              Royal Portraits ({GALLERY_PHOTOS.filter(p => p.aspect === "portrait").length})
            </button>
          </div>
        </div>

        {/* Dynamic Royal Mosaic Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredPhotos.map((photo) => {
            const originalIndex = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
            const isPortrait = photo.aspect === "portrait";

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedIndex(originalIndex)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border-2 border-gold-antique/50 bg-[#42101F] shadow-royal transition-all duration-500 hover:border-gold-champagne hover:shadow-gold-glow hover:-translate-y-1.5 ${
                  isPortrait ? "sm:row-span-2" : ""
                }`}
              >
                {/* Ornamental Corners on Hover */}
                <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CornerFlourish position="tl" className="w-6 h-6 text-gold-champagne" />
                </div>
                <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CornerFlourish position="tr" className="w-6 h-6 text-gold-champagne" />
                </div>

                {/* Inner Border Frame */}
                <div className="absolute inset-2 rounded-xl border border-gold-champagne/20 pointer-events-none z-10 group-hover:border-gold-champagne/50 transition-colors" />

                {/* Aspect Ratio Container */}
                <div
                  className={`relative w-full ${
                    isPortrait ? "h-96 sm:h-full min-h-[380px]" : "h-64 sm:h-72"
                  } overflow-hidden`}
                >
                  <picture>
                    <source srcSet={photo.src} type="image/webp" />
                    <img
                      src={photo.srcJpg}
                      alt={`${photo.titleEn} - Sai Kiran & Maheswari Pre-Wedding`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
                    />
                  </picture>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Center Zoom Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <span className="w-12 h-12 rounded-full bg-gold-antique/90 text-maroon-dark flex items-center justify-center shadow-gold-glow transform scale-75 group-hover:scale-100 transition-transform">
                      <ZoomIn className="w-6 h-6" />
                    </span>
                  </div>

                  {/* Caption & Title Badge */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20 flex flex-col justify-end text-left">
                    <span className="font-telugu text-gold-champagne text-xs sm:text-sm font-semibold tracking-wide drop-shadow-md">
                      {photo.titleTe}
                    </span>
                    <h3 className="font-heading font-bold text-white text-base sm:text-lg tracking-wide group-hover:text-gold-champagne transition-colors drop-shadow-md">
                      {photo.titleEn}
                    </h3>
                    <p className="font-sans text-cream-warm/85 text-xs line-clamp-2 mt-1 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                      {photo.subtitle}
                    </p>
                  </div>

                  {/* Aspect Badge (Pill) */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-gold-antique/40 text-gold-champagne font-ceremonial text-[10px] tracking-widest uppercase">
                      {isPortrait ? "Portrait" : "Landscape"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note within Gallery */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#42101F]/80 border border-gold-antique/50 shadow-royal">
            <Heart className="w-4 h-4 text-gold-antique animate-pulse" />
            <span className="font-display italic text-cream-warm text-xs sm:text-sm">
              Click on any photograph to view in full royal screen resolution
            </span>
          </div>
        </div>
      </div>

      {/* FULLSCREEN ROYAL LIGHTBOX MODAL */}
      {selectedIndex !== null && activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo Lightbox"
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 backdrop-blur-md animate-fadeIn"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="w-full max-w-7xl px-4 py-3 flex items-center justify-between z-50 bg-gradient-to-b from-black/80 to-transparent">
            {/* Counter */}
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full bg-[#42101F] border border-gold-antique/60 text-gold-champagne font-heading text-xs sm:text-sm font-semibold tracking-wider">
                {selectedIndex + 1} / {GALLERY_PHOTOS.length}
              </span>
              <span className="hidden sm:inline font-ceremonial text-xs text-cream-warm/70 uppercase tracking-widest">
                Sai Kiran & Maheswari
              </span>
            </div>

            {/* Actions: Close */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedIndex(null)}
                className="w-10 h-10 rounded-full bg-[#42101F]/90 border border-gold-antique text-gold-champagne hover:bg-gold-antique hover:text-maroon-dark transition-all flex items-center justify-center shadow-royal"
                title="Close (Esc)"
                aria-label="Close Gallery Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Photo Area with Navigation */}
          <div className="relative flex-1 w-full flex items-center justify-center px-4 sm:px-16 overflow-hidden">
            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#42101F]/80 hover:bg-gold-antique hover:text-maroon-dark border border-gold-antique text-gold-champagne transition-all flex items-center justify-center shadow-royal"
              title="Previous (Left Arrow)"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Current Image */}
            <div className="relative max-w-5xl max-h-[72vh] flex items-center justify-center p-2 rounded-2xl border-2 border-gold-antique/40 bg-[#2A0B14]/80 shadow-royal">
              <picture>
                <source srcSet={activePhoto.src} type="image/webp" />
                <img
                  src={activePhoto.srcJpg}
                  alt={activePhoto.titleEn}
                  className="max-h-[68vh] max-w-full object-contain rounded-xl select-none"
                />
              </picture>
            </div>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#42101F]/80 hover:bg-gold-antique hover:text-maroon-dark border border-gold-antique text-gold-champagne transition-all flex items-center justify-center shadow-royal"
              title="Next (Right Arrow)"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Bar: Captions & Thumbnail Strip */}
          <div className="w-full max-w-4xl px-4 py-3 pb-6 flex flex-col items-center text-center z-50 bg-gradient-to-t from-black to-transparent">
            {/* Title & Description */}
            <div className="mb-3">
              <div className="flex items-center justify-center gap-2">
                <span className="font-telugu text-gold-champagne text-sm sm:text-base font-semibold">
                  {activePhoto.titleTe}
                </span>
                <span className="text-gold-antique/60">•</span>
                <h4 className="font-heading text-white text-base sm:text-xl font-bold tracking-wide">
                  {activePhoto.titleEn}
                </h4>
              </div>
              <p className="font-sans text-cream-warm/80 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
                {activePhoto.subtitle}
              </p>
            </div>

            {/* Thumbnail Carousel Strip */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 px-2 scrollbar-thin">
              {GALLERY_PHOTOS.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === selectedIndex
                      ? "border-gold-champagne scale-110 shadow-gold-glow"
                      : "border-gold-antique/30 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.titleEn}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
