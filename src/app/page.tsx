"use client";

import React, { useState } from "react";
import { HeaderNav } from "@/components/HeaderNav";
import { OpeningExperience } from "@/components/OpeningExperience";
import { WeddingHero } from "@/components/WeddingHero";
import { DevotionalInvocation } from "@/components/DevotionalInvocation";
import { TheInvitation } from "@/components/TheInvitation";
import { CoupleProfiles } from "@/components/CoupleProfiles";
import { TwoDaySchedule } from "@/components/TwoDaySchedule";
import { WeddingMuhurtham } from "@/components/WeddingMuhurtham";
import { WeddingVenue } from "@/components/WeddingVenue";
import { FamilyAndElders } from "@/components/FamilyAndElders";
import { ClosingMessage } from "@/components/ClosingMessage";
import { RSVPSection } from "@/components/RSVPSection";
import { DownloadInvitation } from "@/components/DownloadInvitation";
import { InvitationFooter } from "@/components/InvitationFooter";
import { MusicController } from "@/components/MusicController";
import { BackToTop } from "@/components/BackToTop";

export default function WeddingPage() {
  const [openingDismissed, setOpeningDismissed] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#2A0B14]">
      {/* SECTION 1: Opening Experience (Modal / Envelope with skip option) */}
      <OpeningExperience onOpenComplete={() => setOpeningDismissed(true)} />

      {/* Persistent Floating Navigation */}
      <HeaderNav />

      {/* Grand Hero Opening Section */}
      <WeddingHero />

      {/* SECTION 2: Devotional Invocation */}
      <DevotionalInvocation />

      {/* SECTION 3: The Invitation & Akshinthalu Shower */}
      <TheInvitation />

      {/* SECTION 4: Meet the Bride & Groom */}
      <CoupleProfiles />

      {/* DEDICATED TWO-DAY WEDDING CELEBRATION SCHEDULE (Haldi & Music + Wedding) */}
      <TwoDaySchedule />

      {/* SECTION 5: Wedding Muhurtham & Live Countdown */}
      <WeddingMuhurtham />

      {/* SECTION 6: Wedding Venue & Google Maps Integration */}
      <WeddingVenue />

      {/* SECTION 7 & 8: Family, Elders & With Best Compliments From */}
      <FamilyAndElders />

      {/* SECTION 9: Closing Message & Warm Regards */}
      <ClosingMessage />

      {/* Interactive: RSVP Section */}
      <RSVPSection />

      {/* Interactive: Printable Invitation Card (PDF) */}
      <div className="bg-cream-ivory py-4">
        <DownloadInvitation />
      </div>

      {/* Footer */}
      <InvitationFooter />

      {/* Interactive Floating Controllers */}
      <MusicController />
      <BackToTop />
    </main>
  );
}
