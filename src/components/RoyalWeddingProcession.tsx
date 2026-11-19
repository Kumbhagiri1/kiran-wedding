"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Sparkles, Music } from "lucide-react";
import { GoldDivider } from "./OrnamentalMotifs";

export function RoyalWeddingProcession() {
  const [isPlayingDhol, setIsPlayingDhol] = useState(false);
  const [activeBeat, setActiveBeat] = useState<number | null>(null);
  const [activeDrumHit, setActiveDrumHit] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rhythmTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stepRef = useRef<number>(0);

  // Initialize Web Audio Context on user gesture
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Synthesize Deep Bass Dhol Hit (Dhum / Dha)
  const playDholBass = useCallback((timeOffset = 0, accent = false) => {
    try {
      const ctx = getAudioContext();
      const t = ctx.currentTime + timeOffset;

      // Primary bass tone with rapid pitch drop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startFreq = accent ? 135 : 115;
      const endFreq = 42;

      osc.type = "sine";
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.22);

      gain.gain.setValueAtTime(accent ? 0.85 : 0.65, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.26);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.26);

      // Thump transient (snappy attack)
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = "triangle";
      clickOsc.frequency.setValueAtTime(260, t);
      clickOsc.frequency.exponentialRampToValueAtTime(50, t + 0.04);
      clickGain.gain.setValueAtTime(0.4, t);
      clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(t);
      clickOsc.stop(t + 0.04);
    } catch (e) {
      console.warn("AudioContext error", e);
    }
  }, [getAudioContext]);

  // Synthesize Crisp High Treble Dhol Slap (Takk / Ta)
  const playDholTreble = useCallback((timeOffset = 0, snap = false) => {
    try {
      const ctx = getAudioContext();
      const t = ctx.currentTime + timeOffset;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(snap ? 460 : 380, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.08);

      gain.gain.setValueAtTime(snap ? 0.6 : 0.42, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);
    } catch (e) {
      console.warn("AudioContext error", e);
    }
  }, [getAudioContext]);

  // Synthesize Royal Horn Fanfare (Tutari / Shehnai motif)
  const playTutariFanfare = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const t = ctx.currentTime;
      const notes = [
        { f: 440, dur: 0.15, d: 0 },
        { f: 554, dur: 0.15, d: 0.14 },
        { f: 659, dur: 0.35, d: 0.28 },
      ];

      notes.forEach(({ f, dur, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(f, t + d);

        gain.gain.setValueAtTime(0.2, t + d);
        gain.gain.exponentialRampToValueAtTime(0.001, t + d + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + d);
        osc.stop(t + d + dur);
      });
    } catch (e) {
      console.warn("AudioContext error", e);
    }
  }, [getAudioContext]);

  // Authentic 8-step Baraat Dhol Rhythm Loop
  useEffect(() => {
    if (!isPlayingDhol) {
      if (rhythmTimerRef.current) {
        clearInterval(rhythmTimerRef.current);
        rhythmTimerRef.current = null;
      }
      setActiveBeat(null);
      return;
    }

    // 8-step groove (~115 BPM: 130ms per step)
    const intervalMs = 135;
    stepRef.current = 0;

    rhythmTimerRef.current = setInterval(() => {
      const step = stepRef.current % 8;
      setActiveBeat(step);

      // Rhythm pattern:
      // Step 0: Dha (Bass + Treble) - Big downbeat
      // Step 1: Ge (Treble ghost)
      // Step 2: Takk (Sharp Treble)
      // Step 3: Dhum (Bass bounce)
      // Step 4: Dha (Bass + Treble) - Mid-measure accent
      // Step 5: Takk (Treble)
      // Step 6: Dhum (Fast double bass)
      // Step 7: Takk (Sharp turnaround)
      switch (step) {
        case 0:
          playDholBass(0, true);
          playDholTreble(0, true);
          break;
        case 1:
          playDholTreble(0, false);
          break;
        case 2:
          playDholTreble(0, true);
          break;
        case 3:
          playDholBass(0, false);
          break;
        case 4:
          playDholBass(0, true);
          playDholTreble(0, false);
          break;
        case 5:
          playDholTreble(0, true);
          break;
        case 6:
          playDholBass(0, false);
          break;
        case 7:
          playDholTreble(0, true);
          break;
      }

      stepRef.current += 1;
    }, intervalMs);

    return () => {
      if (rhythmTimerRef.current) {
        clearInterval(rhythmTimerRef.current);
        rhythmTimerRef.current = null;
      }
    };
  }, [isPlayingDhol, playDholBass, playDholTreble]);

  // Manual Trigger Handlers
  const handleTapBass = () => {
    playDholBass(0, true);
    setActiveDrumHit("bass");
    setTimeout(() => setActiveDrumHit(null), 200);
  };

  const handleTapTreble = () => {
    playDholTreble(0, true);
    setActiveDrumHit("treble");
    setTimeout(() => setActiveDrumHit(null), 200);
  };

  const handleTapTutari = () => {
    playTutariFanfare();
    setActiveDrumHit("tutari");
    setTimeout(() => setActiveDrumHit(null), 400);
  };

  const toggleDholLoop = () => {
    getAudioContext();
    setIsPlayingDhol((prev) => !prev);
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#18040A] via-[#2A0B14] to-[#150308] text-cream-warm pt-20 sm:pt-24 pb-8 px-4 border-t-2 border-gold-antique/40 overflow-hidden select-none">
      {/* Background Decorative Sparkles & Light Beam */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(198,161,91,0.12),transparent_70%)] pointer-events-none" />

      {/* Floating Animated Notes when drums are playing */}
      {isPlayingDhol && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute left-[15%] bottom-28 text-gold-champagne/70 text-lg animate-bounce duration-700">♪</span>
          <span className="absolute left-[25%] bottom-36 text-gold-light/60 text-xl animate-pulse">🥁</span>
          <span className="absolute left-[45%] bottom-32 text-gold-champagne/80 text-sm animate-bounce duration-500">♫</span>
          <span className="absolute left-[65%] bottom-40 text-gold-light/70 text-base animate-pulse">✨</span>
          <span className="absolute left-[80%] bottom-30 text-gold-champagne/60 text-lg animate-bounce duration-600">🪘</span>
          <span className="absolute left-[90%] bottom-36 text-gold-light/80 text-sm animate-pulse">♬</span>
        </div>
      )}

      <div className="relative max-w-6xl mx-auto text-center space-y-4">
        {/* Festive Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-gold-antique/15 border border-gold-antique/40">
            <Sparkles className="w-3.5 h-3.5 text-gold-champagne animate-pulse" />
            <span className="font-ceremonial text-xs sm:text-sm tracking-[0.25em] text-gold-champagne uppercase font-bold">
              పెళ్లి బాజా • మంగళ వాయిద్యాలు
            </span>
            <Sparkles className="w-3.5 h-3.5 text-gold-champagne animate-pulse" />
          </div>

          <h3 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-gold-champagne tracking-wider">
            Royal Wedding Procession & Festive Dhol
          </h3>

          <p className="font-display italic text-xs sm:text-sm text-cream-warm/80 max-w-2xl mx-auto">
            Celebrated with majestic riding elephants, echoing wedding drums (dhol & mangala vaadyalu), and joyous dancing family & friends!
          </p>
        </div>

        {/* Interactive Drum Playing Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2 pb-4">
          {/* Main Loop Toggle */}
          <button
            onClick={toggleDholLoop}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-md ${
              isPlayingDhol
                ? "bg-gradient-to-r from-amber-600 to-amber-700 text-cream-ivory border-2 border-gold-champagne shadow-gold-glow animate-pulse"
                : "bg-[#42101F] hover:bg-[#641B2E] text-gold-champagne border-2 border-gold-antique/70 hover:scale-105"
            }`}
          >
            {isPlayingDhol ? (
              <>
                <VolumeX className="w-4 h-4 text-cream-ivory" />
                <span>Pause Wedding Drums</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-gold-champagne animate-bounce" />
                <span>🥁 Play Wedding Dhol Beats</span>
              </>
            )}
          </button>

          {/* Quick Tap Buttons */}
          <button
            onClick={handleTapBass}
            className={`px-4 py-2 rounded-full bg-[#350A17] border border-gold-antique/60 text-gold-champagne font-ceremonial text-xs uppercase tracking-wider hover:bg-[#521325] active:scale-95 transition-transform ${
              activeDrumHit === "bass" || (isPlayingDhol && (activeBeat === 0 || activeBeat === 4))
                ? "border-amber-400 bg-amber-900/60 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                : ""
            }`}
          >
            🥁 Dhol Bass (Dhum)
          </button>

          <button
            onClick={handleTapTreble}
            className={`px-4 py-2 rounded-full bg-[#350A17] border border-gold-antique/60 text-gold-champagne font-ceremonial text-xs uppercase tracking-wider hover:bg-[#521325] active:scale-95 transition-transform ${
              activeDrumHit === "treble" || (isPlayingDhol && (activeBeat === 2 || activeBeat === 5 || activeBeat === 7))
                ? "border-amber-400 bg-amber-900/60 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                : ""
            }`}
          >
            🪘 High Slap (Takk)
          </button>

          <button
            onClick={handleTapTutari}
            className={`px-4 py-2 rounded-full bg-[#350A17] border border-gold-antique/60 text-gold-champagne font-ceremonial text-xs uppercase tracking-wider hover:bg-[#521325] active:scale-95 transition-transform ${
              activeDrumHit === "tutari" ? "border-amber-400 bg-amber-900/60 shadow-[0_0_12px_rgba(251,191,36,0.6)]" : ""
            }`}
          >
            📯 Tutari Fanfare
          </button>
        </div>

        {/* PANORAMIC ROYAL WEDDING PROCESSION SVG */}
        <div className="relative w-full overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-gold-antique/40">
          <div className="text-[10px] sm:hidden text-gold-champagne/60 tracking-widest uppercase mb-1.5 flex items-center justify-center space-x-1.5">
            <span>‹</span>
            <span>Swipe to view the full royal procession</span>
            <span>›</span>
          </div>
          <div className="min-w-[900px] lg:min-w-full">
            <svg
              viewBox="0 0 1200 240"
              className={`w-full h-auto max-h-56 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-transform duration-300 ${
                isPlayingDhol ? "scale-[1.01]" : ""
              }`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Royal Gold Shimmer Gradient */}
                <linearGradient id="procGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C6A15B" />
                  <stop offset="30%" stopColor="#FFF2D6" />
                  <stop offset="70%" stopColor="#E5C178" />
                  <stop offset="100%" stopColor="#9E7B36" />
                </linearGradient>

                <linearGradient id="clothGold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E8D6AD" />
                  <stop offset="50%" stopColor="#C6A15B" />
                  <stop offset="100%" stopColor="#641B2E" />
                </linearGradient>

                <linearGradient id="drumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#82263E" />
                  <stop offset="50%" stopColor="#C6A15B" />
                  <stop offset="100%" stopColor="#82263E" />
                </linearGradient>
              </defs>

              {/* OVERHEAD DECORATIVE HANGING MARIGOLD TORAN & TEMPLE BELLS */}
              <g opacity="0.65">
                {/* Wavy Garland Line */}
                <path
                  d="M0 12 Q 100 28, 200 12 Q 300 28, 400 12 Q 500 28, 600 12 Q 700 28, 800 12 Q 900 28, 1000 12 Q 1100 28, 1200 12"
                  stroke="url(#procGold)"
                  strokeWidth="1.5"
                  fill="none"
                />
                {/* Hanging Bells (Ghanta) */}
                {[50, 150, 250, 350, 450, 550, 650, 750, 850, 950, 1050, 1150].map((bx) => (
                  <g key={bx} transform={`translate(${bx}, 18)`}>
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#C6A15B" strokeWidth="1" />
                    <path d="M-4 10 C-4 14, -6 18, -7 20 L7 20 C6 18, 4 14, 4 10 Z" fill="url(#procGold)" />
                    <circle cx="0" cy="22" r="1.5" fill="#E8D6AD" />
                  </g>
                ))}
              </g>

              {/* GROUND FESTIVE FLORAL FRIEZE BORDER */}
              <g transform="translate(0, 218)">
                <line x1="0" y1="0" x2="1200" y2="0" stroke="url(#procGold)" strokeWidth="2" />
                <line x1="0" y1="4" x2="1200" y2="4" stroke="#C6A15B" strokeWidth="0.75" strokeDasharray="6 3" />
                {/* Auspicious tiny floral markers */}
                {[60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140].map((fx) => (
                  <circle key={fx} cx={fx} cy="10" r="2" fill="url(#procGold)" />
                ))}
              </g>

              {/* =========================================================================
                  FIGURE 1: ROYAL TUTARI / HORN BLOWER (Far Left - x ≈ 70)
                  ========================================================================= */}
              <g transform="translate(45, 0)">
                {/* Musician Silhouette */}
                {/* Head with Turban */}
                <circle cx="50" cy="115" r="9" fill="url(#procGold)" />
                <path d="M42 114 C42 104, 58 104, 58 114 Z" fill="url(#procGold)" />
                <path d="M54 105 C54 98, 62 100, 60 106 Z" fill="#FFF2D6" /> {/* Turban plume */}
                {/* Torso & Kurta */}
                <path d="M42 124 L58 124 L62 165 L38 165 Z" fill="url(#procGold)" />
                {/* Dhoti / Legs */}
                <path d="M40 165 L36 215 L46 215 L49 175 L52 215 L62 215 L58 165 Z" fill="url(#procGold)" />
                {/* Arms holding Tutari */}
                <path d="M45 130 L65 125 L75 110" stroke="url(#procGold)" strokeWidth="4" strokeLinecap="round" />
                {/* The Iconic Sweeping C-Curved Tutari Horn */}
                <path
                  d="M58 118 C70 120, 85 110, 85 85 C85 55, 50 45, 45 75 C42 95, 62 110, 80 115"
                  stroke="url(#procGold)"
                  strokeWidth="3.5"
                  fill="none"
                />
                {/* Flaring Tutari Bell pointing upward */}
                <path d="M40 70 L48 62 L52 78 Z" fill="url(#procGold)" />
                {/* Banner Pennant hanging from Tutari */}
                <path d="M48 68 C44 80, 36 90, 48 100 L44 95 Z" fill="#82263E" stroke="url(#procGold)" strokeWidth="0.75" />
              </g>

              {/* =========================================================================
                  FIGURE 2: SHAHNAI / NADASWARAM AUSPICIOUS WIND PLAYER (x ≈ 150)
                  ========================================================================= */}
              <g transform="translate(130, 0)">
                {/* Head */}
                <circle cx="45" cy="120" r="8.5" fill="url(#procGold)" />
                <path d="M38 118 C38 108, 52 108, 52 118 Z" fill="url(#procGold)" />
                {/* Torso */}
                <path d="M38 128 L52 128 L56 168 L34 168 Z" fill="url(#procGold)" />
                {/* Legs */}
                <path d="M36 168 L32 215 L42 215 L45 178 L48 215 L58 215 L54 168 Z" fill="url(#procGold)" />
                {/* Arms playing flute / shehnai */}
                <path d="M42 132 L58 135 L75 142" stroke="url(#procGold)" strokeWidth="3.5" strokeLinecap="round" />
                {/* Long Auspicious Nadaswaram Pipe with flared golden bell */}
                <line x1="48" y1="124" x2="88" y2="148" stroke="url(#procGold)" strokeWidth="3" />
                <path d="M85 142 L94 148 L87 154 Z" fill="#FFF2D6" stroke="url(#procGold)" strokeWidth="1" />
              </g>

              {/* =========================================================================
                  FIGURE 3: LEAD DHOL DRUMMER (Beating Wedding Dhol - x ≈ 235)
                  ========================================================================= */}
              <g
                transform="translate(215, 0)"
                className={isPlayingDhol && (activeBeat === 0 || activeBeat === 4) ? "translate-y-[-3px] transition-transform" : "transition-transform"}
              >
                {/* Head with Pagdi */}
                <circle cx="50" cy="115" r="9" fill="url(#procGold)" />
                <path d="M41 114 C41 102, 59 102, 59 114 Z" fill="url(#procGold)" />
                <path d="M47 104 L53 96 L56 104 Z" fill="#FFF2D6" />
                {/* Torso */}
                <path d="M40 124 L60 124 L64 162 L36 162 Z" fill="url(#procGold)" />
                {/* Bended Rhythmic Legs */}
                <path d="M38 162 L30 190 L34 215 L45 215 L42 190 L56 190 L54 215 L66 215 L62 162 Z" fill="url(#procGold)" />
                {/* Barrel Dhol Drum */}
                <g transform="translate(50, 150) rotate(-12)">
                  <ellipse cx="0" cy="0" rx="24" ry="16" fill="url(#drumGrad)" stroke="url(#procGold)" strokeWidth="1.5" />
                  <ellipse cx="-22" cy="0" rx="4" ry="15" fill="#E8D6AD" stroke="url(#procGold)" strokeWidth="1" />
                  <ellipse cx="22" cy="0" rx="4" ry="15" fill="#E8D6AD" stroke="url(#procGold)" strokeWidth="1" />
                  {/* Dhol Tension Ropes */}
                  <path d="M-22 0 L-10 14 L4 -14 L18 14 L22 0" stroke="#FFF2D6" strokeWidth="0.8" fill="none" />
                </g>
                {/* Drum Strap */}
                <path d="M42 125 L65 155" stroke="url(#procGold)" strokeWidth="1.5" />
                {/* Arms with curved Dagga and Stick striking */}
                <path d="M40 128 L24 140 L28 152" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                <path d="M60 128 L76 138 L72 150" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                {/* Soundwaves if drum hit */}
                {isPlayingDhol && (
                  <circle cx="25" cy="150" r="10" stroke="#FFF2D6" strokeWidth="1" fill="none" opacity="0.8" />
                )}
              </g>

              {/* =========================================================================
                  FIGURE 4: JOYFUL DANCING BARAATI (Male jumping in celebration - x ≈ 335)
                  ========================================================================= */}
              <g
                transform="translate(315, 0)"
                className={isPlayingDhol ? "rotate-[-2deg] origin-bottom transition-transform" : ""}
              >
                {/* Head with Turban */}
                <circle cx="50" cy="108" r="9" fill="url(#procGold)" />
                <path d="M40 106 C40 94, 60 94, 60 106 Z" fill="url(#procGold)" />
                <circle cx="50" cy="95" r="3" fill="#FFF2D6" />
                {/* Torso */}
                <path d="M42 118 L58 118 L62 155 L38 155 Z" fill="url(#procGold)" />
                {/* Dancing Arms Raised in Joy (\o/) */}
                <path d="M42 122 L26 100 L18 85" stroke="url(#procGold)" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M58 122 L74 100 L82 85" stroke="url(#procGold)" strokeWidth="3.5" strokeLinecap="round" />
                {/* Flowing Festive Dupatta / Scarf */}
                <path d="M22 96 C28 115, 38 125, 42 122" stroke="#82263E" strokeWidth="2.5" fill="none" />
                <path d="M78 96 C72 115, 62 125, 58 122" stroke="#82263E" strokeWidth="2.5" fill="none" />
                {/* Dancing Legs (One leg raised in bhangra step) */}
                <path d="M40 155 L34 185 L30 215 L40 215 L45 185 L58 175 L70 190 L65 198 L56 182 L48 155 Z" fill="url(#procGold)" />
              </g>

              {/* =========================================================================
                  FIGURE 5: GRACEFUL FEMALE DANCER (Twirling Lehenga - x ≈ 425)
                  ========================================================================= */}
              <g
                transform="translate(410, 0)"
                className={isPlayingDhol ? "rotate-[2deg] origin-bottom transition-transform" : ""}
              >
                {/* Head with Maang Tikka */}
                <circle cx="45" cy="114" r="8" fill="url(#procGold)" />
                <path d="M38 112 C38 102, 52 102, 52 112 Z" fill="url(#procGold)" />
                <line x1="45" y1="104" x2="45" y2="110" stroke="#FFF2D6" strokeWidth="1.5" />
                {/* Long Braid swinging */}
                <path d="M38 116 C30 125, 32 140, 26 150" stroke="url(#procGold)" strokeWidth="2.5" fill="none" />
                {/* Choli (Blouse) */}
                <path d="M38 122 L52 122 L50 142 L40 142 Z" fill="url(#procGold)" />
                {/* Graceful Dancing Arms in Classical Mudra */}
                <path d="M38 124 L22 110 L26 95" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                <path d="M52 124 L68 115 L62 100" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                {/* Swirling Festive Flared Lehenga Skirt */}
                <path
                  d="M40 142 L50 142 C56 165, 78 190, 80 215 L10 215 C12 190, 34 165, 40 142 Z"
                  fill="url(#clothGold)"
                  stroke="url(#procGold)"
                  strokeWidth="1.5"
                />
                {/* Lehenga Decorative Borders */}
                <path d="M14 205 C38 198, 62 198, 76 205" stroke="#FFF2D6" strokeWidth="1" fill="none" />
                <path d="M12 212 C38 206, 62 206, 78 212" stroke="#FFF2D6" strokeWidth="1" fill="none" />
              </g>

              {/* =========================================================================
                  FIGURE 6: SECOND DHOL / TASHA DRUMMER (x ≈ 510)
                  ========================================================================= */}
              <g transform="translate(495, 0)">
                <circle cx="48" cy="116" r="8.5" fill="url(#procGold)" />
                <path d="M40 114 C40 104, 56 104, 56 114 Z" fill="url(#procGold)" />
                <path d="M38 125 L58 125 L60 165 L36 165 Z" fill="url(#procGold)" />
                <path d="M38 165 L34 215 L44 215 L48 180 L52 215 L62 215 L58 165 Z" fill="url(#procGold)" />
                {/* Dhol at Alternate Angle */}
                <g transform="translate(48, 152) rotate(14)">
                  <ellipse cx="0" cy="0" rx="22" ry="15" fill="url(#drumGrad)" stroke="url(#procGold)" strokeWidth="1.5" />
                  <ellipse cx="-20" cy="0" rx="3.5" ry="14" fill="#E8D6AD" stroke="url(#procGold)" strokeWidth="1" />
                  <ellipse cx="20" cy="0" rx="3.5" ry="14" fill="#E8D6AD" stroke="url(#procGold)" strokeWidth="1" />
                </g>
                <path d="M38 128 L20 142" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                <path d="M58 128 L72 144" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* =========================================================================
                  FIGURE 7: THE GRAND CAPARISONED ELEPHANT WITH HOWDAH (Centerpiece - x ≈ 600-880)
                  "Riding elephant people drum"
                  ========================================================================= */}
              <g transform="translate(590, 0)">
                {/* 1. ELEPHANT LEGS & BODY */}
                {/* Back Left Leg */}
                <path d="M85 160 L80 215 L98 215 L102 165 Z" fill="url(#procGold)" opacity="0.85" />
                {/* Back Right Leg */}
                <path d="M110 155 L105 215 L125 215 L128 160 Z" fill="url(#procGold)" />
                {/* Golden Anklets with Bells on legs */}
                <rect x="79" y="206" width="20" height="4" fill="#FFF2D6" rx="1" />
                <rect x="104" y="206" width="22" height="4" fill="#FFF2D6" rx="1" />

                {/* Front Left Leg */}
                <path d="M175 160 L170 215 L188 215 L192 160 Z" fill="url(#procGold)" opacity="0.85" />
                {/* Front Right Leg (Stepping Forward) */}
                <path d="M195 155 L200 215 L220 215 L215 155 Z" fill="url(#procGold)" />
                <rect x="169" y="206" width="20" height="4" fill="#FFF2D6" rx="1" />
                <rect x="199" y="206" width="22" height="4" fill="#FFF2D6" rx="1" />

                {/* Elephant Massive Torso & Back */}
                <path
                  d="M70 145 C65 115, 95 95, 140 92 C190 90, 220 100, 230 115 C240 125, 235 155, 215 165 C175 175, 115 175, 80 165 Z"
                  fill="url(#procGold)"
                />

                {/* Elephant Tail with tuft */}
                <path d="M72 135 C60 145, 62 175, 64 185" stroke="url(#procGold)" strokeWidth="2.5" fill="none" />
                <circle cx="64" cy="186" r="3" fill="#FFF2D6" />

                {/* 2. ELEPHANT HEAD & CURLED TRUNK (Blessing Gesture) */}
                <circle cx="230" cy="120" r="28" fill="url(#procGold)" />
                {/* Large Auspicious Ear */}
                <path d="M210 105 C195 110, 195 140, 215 145 C225 140, 225 110, 210 105 Z" fill="#E8D6AD" stroke="url(#procGold)" strokeWidth="1.5" />
                {/* Auspicious Earring hanging from ear */}
                <circle cx="206" cy="146" r="3" fill="#FFF2D6" />

                {/* Gracefully Curled Trunk (Gaja Pooja Blessing) */}
                <path
                  d="M245 125 C265 135, 275 170, 260 190 C250 200, 235 190, 240 178 C245 168, 265 160, 275 145 C280 135, 275 125, 268 128"
                  stroke="url(#procGold)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Golden Lotus in Trunk */}
                <path d="M272 125 C275 115, 285 115, 282 125 C285 128, 275 132, 272 125 Z" fill="#FFF2D6" />

                {/* Curved Ivory Tusks with Golden Ring */}
                <path d="M248 135 C262 142, 272 140, 275 130" stroke="#FFFDF9" strokeWidth="3" strokeLinecap="round" fill="none" />
                <rect x="256" y="133" width="3" height="5" fill="#E8D6AD" />

                {/* Nettipattam (Royal Gold Forehead Ornament) */}
                <path d="M228 98 L244 114 L236 126 L224 118 Z" fill="url(#clothGold)" stroke="#FFF2D6" strokeWidth="1" />
                <circle cx="234" cy="112" r="3" fill="#FFF2D6" />

                {/* 3. ORNATE SADDLE BLANKET (JHOOL) WITH HANGING BELLS */}
                <path
                  d="M95 105 L205 105 C205 145, 195 165, 150 168 C105 165, 95 145, 95 105 Z"
                  fill="url(#clothGold)"
                  stroke="url(#procGold)"
                  strokeWidth="1.5"
                />
                {/* Golden Floral Motif on Jhool */}
                <circle cx="150" cy="135" r="12" fill="url(#procGold)" opacity="0.9" />
                <circle cx="150" cy="135" r="6" fill="#82263E" />
                {/* Scalloped Gold Bells along bottom edge */}
                {[108, 122, 136, 150, 164, 178, 192].map((bx) => (
                  <circle key={bx} cx={bx} cy="168" r="2.5" fill="#FFF2D6" />
                ))}

                {/* 4. THE ROYAL HOWDAH (AMBARI - CANOPIED GOLDEN THRONE) */}
                {/* Howdah Base Platform */}
                <rect x="120" y="80" width="60" height="14" fill="url(#procGold)" rx="2" stroke="#FFF2D6" strokeWidth="1" />
                {/* Ornate Railing */}
                <line x1="122" y1="86" x2="178" y2="86" stroke="#82263E" strokeWidth="1" />

                {/* Howdah Pillars */}
                <line x1="128" y1="80" x2="128" y2="45" stroke="url(#procGold)" strokeWidth="3" />
                <line x1="172" y1="80" x2="172" y2="45" stroke="url(#procGold)" strokeWidth="3" />

                {/* Royal Chhatri / Domed Canopy */}
                <path d="M120 45 C120 28, 180 28, 180 45 Z" fill="url(#clothGold)" stroke="url(#procGold)" strokeWidth="1.5" />
                {/* Kalash Finial on Dome */}
                <path d="M148 28 L152 28 L150 20 Z" fill="#FFF2D6" stroke="url(#procGold)" strokeWidth="1" />
                {/* Waving Auspicious Flag on Howdah */}
                <path d="M150 20 L168 25 L150 30 Z" fill="#82263E" stroke="url(#procGold)" strokeWidth="0.75" />

                {/* Dignified Royal Mahout (Elephant Rider) */}
                <circle cx="212" cy="74" r="7" fill="url(#procGold)" />
                <path d="M205 72 C205 64, 220 64, 220 72 Z" fill="#FFF2D6" />
                <path d="M206 81 L220 81 L222 96 L202 96 Z" fill="url(#procGold)" />
                {/* Mahout holding Ankus (Royal Goad) */}
                <line x1="216" y1="80" x2="232" y2="68" stroke="#FFF2D6" strokeWidth="2" />
                <path d="M232 68 C236 65, 236 72, 230 73" stroke="#FFF2D6" strokeWidth="1.5" fill="none" />
              </g>

              {/* =========================================================================
                  FIGURE 8: ATTENDANT CARRYING ROYAL UMBRELLA / CHHATRI (x ≈ 910)
                  ========================================================================= */}
              <g transform="translate(895, 0)">
                {/* Person */}
                <circle cx="45" cy="122" r="8" fill="url(#procGold)" />
                <path d="M38 120 C38 110, 52 110, 52 120 Z" fill="url(#procGold)" />
                <path d="M38 130 L52 130 L54 170 L36 170 Z" fill="url(#procGold)" />
                <path d="M38 170 L34 215 L44 215 L48 180 L52 215 L60 215 L56 170 Z" fill="url(#procGold)" />
                {/* Arms holding tall staff */}
                <line x1="48" y1="135" x2="48" y2="35" stroke="url(#procGold)" strokeWidth="2.5" />
                {/* Large Ceremonial Umbrella (Chhatri) */}
                <path d="M18 35 C18 12, 78 12, 78 35 Z" fill="url(#clothGold)" stroke="url(#procGold)" strokeWidth="1.5" />
                <line x1="48" y1="12" x2="48" y2="4" stroke="#FFF2D6" strokeWidth="2" />
                {/* Hanging fringe */}
                <line x1="18" y1="35" x2="78" y2="35" stroke="#FFF2D6" strokeWidth="2" strokeDasharray="4 2" />
              </g>

              {/* =========================================================================
                  FIGURE 9: DAPPU / TAMBOURINE CELEBRATION DRUMMER (x ≈ 995)
                  ========================================================================= */}
              <g
                transform="translate(980, 0)"
                className={isPlayingDhol ? "rotate-[-3deg] origin-bottom transition-transform" : ""}
              >
                <circle cx="45" cy="118" r="8" fill="url(#procGold)" />
                <path d="M38 116 C38 106, 52 106, 52 116 Z" fill="url(#procGold)" />
                <path d="M38 126 L52 126 L56 166 L34 166 Z" fill="url(#procGold)" />
                <path d="M36 166 L30 215 L40 215 L45 178 L50 215 L60 215 L56 166 Z" fill="url(#procGold)" />
                {/* Arms holding Frame Drum / Dappu High in Air */}
                <path d="M42 130 L54 110 L68 95" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                {/* Round Dappu Drum */}
                <circle cx="70" cy="92" r="14" fill="url(#drumGrad)" stroke="url(#procGold)" strokeWidth="1.5" />
                <circle cx="70" cy="92" r="10" stroke="#FFF2D6" strokeWidth="0.75" fill="none" />
                <line x1="58" y1="92" x2="82" y2="92" stroke="#FFF2D6" strokeWidth="1.5" />
              </g>

              {/* =========================================================================
                  FIGURE 10: DANCING FRIEND & WELL-WISHER (Far Right - x ≈ 1080)
                  ========================================================================= */}
              <g
                transform="translate(1065, 0)"
                className={isPlayingDhol ? "rotate-[3deg] origin-bottom transition-transform" : ""}
              >
                <circle cx="48" cy="112" r="8.5" fill="url(#procGold)" />
                <path d="M38 110 C38 98, 58 98, 58 110 Z" fill="url(#procGold)" />
                <path d="M40 120 L56 120 L60 158 L36 158 Z" fill="url(#procGold)" />
                {/* Festive raised arms */}
                <path d="M40 125 L24 105 L20 90" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                <path d="M56 125 L72 105 L78 90" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                {/* Dancing legs */}
                <path d="M38 158 L32 188 L34 215 L44 215 L46 185 L56 185 L54 215 L64 215 L60 158 Z" fill="url(#procGold)" />
              </g>
            </svg>
          </div>
        </div>

        {/* Auspicious Note Below Procession */}
        <p className="font-ceremonial text-[11px] sm:text-xs tracking-[0.2em] text-gold-champagne/90 uppercase pt-1">
          May the beats of the wedding dhol & the melody of the nadaswaram fill their lives with eternal bliss!
        </p>

        <GoldDivider className="my-2" symbol="om" />
      </div>
    </section>
  );
}
