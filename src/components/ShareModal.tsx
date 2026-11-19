"use client";

import React, { useState } from "react";
import { Share2, MessageCircle, Copy, Check, X } from "lucide-react";
import { WEDDING_DATA } from "@/config/weddingData";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const { groom, bride, muhurtham, venue, schedule } = WEDDING_DATA;

  if (!isOpen) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://kumbhagiriwedding.com";

  const haldiEvent = schedule.events[0];
  const weddingEvent = schedule.events[1];

  const shareText = `॥ SHRI GANESHAYA NAMAH ॥\n\n` +
    `You and your family are cordially invited to the Royal Two-Day Wedding Celebration of\n` +
    `*${groom.honorific} ${groom.name}*\n` +
    `with\n` +
    `*${bride.honorific} ${bride.name}*\n\n` +
    `✨ *TWO-DAY CELEBRATION SCHEDULE:*\n\n` +
    `🟡 *EVENT 1 – HALDI & MUSIC CEREMONY*\n` +
    `📅 ${haldiEvent.day}, ${haldiEvent.date}\n` +
    `⏰ *Guest Arrival:* 04:00 PM\n` +
    `_An evening filled with colours, traditions, music & happiness!_\n\n` +
    `🔴 *EVENT 2 – SACRED WEDDING CEREMONY*\n` +
    `📅 ${weddingEvent.day}, ${weddingEvent.date}\n` +
    `⏰ *Sumuhurtham:* ${muhurtham.timeWindow}\n` +
    `⭐ ${muhurtham.nakshatra} | ${muhurtham.tithi} | ${muhurtham.lagna}\n\n` +
    `📍 *Venue:* ${venue.name}, ${venue.fullAddress}\n\n` +
    `Please join us and grace both celebrations with your sacred presence and blessings:\n` +
    `${currentUrl}`;

  const handleWhatsappShare = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${groom.name} & ${bride.name} Wedding Invitation`,
          text: shareText,
          url: currentUrl,
        });
      } catch {
        // User dismissed share dialog
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EF] to-[#F5EBDD] text-darkText rounded-3xl border-2 border-gold-antique p-6 sm:p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-maroon hover:bg-gold-champagne/30 transition-colors"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-maroon/10 border border-gold-antique flex items-center justify-center text-maroon mx-auto mb-2">
            <Share2 className="w-6 h-6 text-maroon" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-maroon-deep">
            Share Royal Invitation
          </h3>
          <p className="font-body text-xs text-darkText/70 mt-1">
            Spread the joyous word of Kiran & Maheshwari&apos;s sacred union
          </p>
        </div>

        <div className="space-y-3">
          {/* WhatsApp Direct Share */}
          <button
            onClick={handleWhatsappShare}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl bg-[#25D366] text-white font-heading font-bold text-sm tracking-wider uppercase shadow-md hover:bg-[#20ba5a] transition-all hover:scale-102"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Share on WhatsApp</span>
          </button>

          {/* Native Web Share API (Mobile Devices) */}
          <button
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl bg-maroon text-gold-champagne font-heading font-bold text-sm tracking-wider uppercase shadow-md hover:bg-maroon-dark transition-all hover:scale-102"
          >
            <Share2 className="w-5 h-5 text-gold-antique" />
            <span>More Sharing Options (Device)</span>
          </button>

          {/* Copy Full Invitation Message */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl bg-cream-warm border border-gold-antique/70 text-maroon font-heading font-semibold text-sm tracking-wider uppercase hover:bg-gold-champagne/40 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Invitation Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 text-gold-dark" />
                <span>Copy Invitation Message & Link</span>
              </>
            )}
          </button>
        </div>

        {/* Preview box */}
        <div className="mt-5 p-3 rounded-lg bg-cream-warm/60 border border-gold-antique/30 text-[11px] text-darkText/70 font-mono line-clamp-3 select-all">
          {shareText}
        </div>
      </div>
    </div>
  );
}
