"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX, Sparkles, Music, Eye, Zap, Flame } from "lucide-react";
import { GoldDivider } from "./OrnamentalMotifs";

export type BeatStyle = "theenmaar" | "bhutto" | "marfa" | "pelibaaja";

interface BeatInfo {
  id: BeatStyle;
  name: string;
  telugu: string;
  tagline: string;
  bpm: number;
  intervalMs: number;
  color: string;
}

const BEAT_STYLES: BeatInfo[] = [
  {
    id: "theenmaar",
    name: "Theen Maar",
    telugu: "తీన్ మార్",
    tagline: "High-Energy Telugu Baraat Dance Beat",
    bpm: 142,
    intervalMs: 106,
    color: "from-amber-600 to-red-600",
  },
  {
    id: "bhutto",
    name: "Bhutto Beat",
    telugu: "భుట్టో బీట్",
    tagline: "Iconic Bouncy Telugu Band & Dhol Groove",
    bpm: 122,
    intervalMs: 123,
    color: "from-amber-500 to-amber-700",
  },
  {
    id: "marfa",
    name: "Hyderabad Marfa",
    telugu: "హైదరాబాద్ మర్ఫా",
    tagline: "Legendary Hyderabadi Wedding Marfa Drum Rhythm",
    bpm: 130,
    intervalMs: 115,
    color: "from-emerald-700 to-amber-600",
  },
  {
    id: "pelibaaja",
    name: "Royal Pelli Baaja",
    telugu: "రాయల్ పెళ్లి బాజా",
    tagline: "Traditional Auspicious Mangala Vaadyalu & Dhol",
    bpm: 112,
    intervalMs: 134,
    color: "from-amber-700 to-rose-800",
  },
];

export function RoyalWeddingProcession() {
  const [isPlayingDhol, setIsPlayingDhol] = useState(false);
  const [selectedBeat, setSelectedBeat] = useState<BeatStyle>("theenmaar");
  const [activeBeat, setActiveBeat] = useState<number | null>(null);
  const [activeDrumHit, setActiveDrumHit] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"front" | "procession">("front");

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
  const playDholBass = useCallback((timeOffset = 0, accent = false, pitch = 115) => {
    try {
      const ctx = getAudioContext();
      const t = ctx.currentTime + timeOffset;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startFreq = accent ? pitch + 25 : pitch;
      const endFreq = 40;

      osc.type = "sine";
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.22);

      gain.gain.setValueAtTime(accent ? 0.9 : 0.7, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.25);

      // Thump transient
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
  const playDholTreble = useCallback((timeOffset = 0, snap = false, freq = 380) => {
    try {
      const ctx = getAudioContext();
      const t = ctx.currentTime + timeOffset;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(snap ? freq + 80 : freq, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.08);

      gain.gain.setValueAtTime(snap ? 0.65 : 0.45, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);
    } catch (e) {
      console.warn("AudioContext error", e);
    }
  }, [getAudioContext]);

  // Synthesize Marfa Wooden Thapi / Kettle Drum Hit
  const playMarfaThapi = useCallback((timeOffset = 0, accent = false) => {
    try {
      const ctx = getAudioContext();
      const t = ctx.currentTime + timeOffset;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(accent ? 160 : 130, t);
      osc.frequency.exponentialRampToValueAtTime(65, t + 0.18);

      gain.gain.setValueAtTime(accent ? 0.85 : 0.6, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);

      const woodOsc = ctx.createOscillator();
      const woodGain = ctx.createGain();
      woodOsc.type = "square";
      woodOsc.frequency.setValueAtTime(750, t);
      woodOsc.frequency.exponentialRampToValueAtTime(180, t + 0.035);
      woodGain.gain.setValueAtTime(0.35, t);
      woodGain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
      woodOsc.connect(woodGain);
      woodGain.connect(ctx.destination);
      woodOsc.start(t);
      woodOsc.stop(t + 0.035);
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

  // Live Selectable Drum Rhythm Loop (Theen Maar, Bhutto, Hyderabad Marfa, Royal Pelli Baaja)
  useEffect(() => {
    if (!isPlayingDhol) {
      if (rhythmTimerRef.current) {
        clearInterval(rhythmTimerRef.current);
        rhythmTimerRef.current = null;
      }
      setActiveBeat(null);
      return;
    }

    const currentBeatConfig = BEAT_STYLES.find((b) => b.id === selectedBeat) || BEAT_STYLES[0];
    const intervalMs = currentBeatConfig.intervalMs;
    stepRef.current = 0;

    rhythmTimerRef.current = setInterval(() => {
      const s = stepRef.current;

      if (selectedBeat === "theenmaar") {
        // TEEN MAAR: Driving 6-step triplet rhythm (Dha - Tin - Takk | Dhum - Takk - TakkTakk)
        const step = s % 6;
        setActiveBeat(step);
        switch (step) {
          case 0:
            playDholBass(0, true, 130);
            playDholTreble(0, true, 460);
            break;
          case 1:
            playDholTreble(0, false, 420);
            break;
          case 2:
            playDholTreble(0, true, 490);
            break;
          case 3:
            playDholBass(0, false, 115);
            break;
          case 4:
            playDholTreble(0, true, 470);
            break;
          case 5:
            playDholTreble(0, false, 430);
            playDholBass(0, false, 110);
            break;
        }
      } else if (selectedBeat === "bhutto") {
        // BHUTTO BEAT: 8-step classic bouncy band groove (Dhum . Takk Dhum | Dha Takk DhumDhum Takk)
        const step = s % 8;
        setActiveBeat(step);
        switch (step) {
          case 0:
            playDholBass(0, true, 125);
            break;
          case 1:
            break;
          case 2:
            playDholTreble(0, true, 450);
            break;
          case 3:
            playDholBass(0, false, 110);
            break;
          case 4:
            playDholBass(0, true, 125);
            playDholTreble(0, false, 390);
            break;
          case 5:
            playDholTreble(0, true, 460);
            break;
          case 6:
            playDholBass(0, false, 115);
            playDholTreble(0, false, 410);
            break;
          case 7:
            playDholTreble(0, true, 480);
            break;
        }
      } else if (selectedBeat === "marfa") {
        // HYDERABAD MARFA: Authentic 8-step Arabian-Hyderabadi polyrhythmic kettle drum & stick groove
        const step = s % 8;
        setActiveBeat(step);
        switch (step) {
          case 0:
            playMarfaThapi(0, true);
            playDholBass(0, true, 110);
            break;
          case 1:
            playMarfaThapi(0, false);
            break;
          case 2:
            playDholTreble(0, true, 480);
            break;
          case 3:
            playMarfaThapi(0, false);
            break;
          case 4:
            playMarfaThapi(0, true);
            playDholBass(0, false, 105);
            break;
          case 5:
            playDholTreble(0, true, 470);
            break;
          case 6:
            playMarfaThapi(0, false);
            playDholTreble(0, false, 420);
            break;
          case 7:
            playDholTreble(0, true, 510);
            break;
        }
      } else {
        // ROYAL PELLI BAAJA: Regal 8-step wedding procession beat
        const step = s % 8;
        setActiveBeat(step);
        switch (step) {
          case 0:
            playDholBass(0, true, 120);
            playDholTreble(0, true, 420);
            break;
          case 1:
            playDholTreble(0, false, 370);
            break;
          case 2:
            playDholTreble(0, true, 440);
            break;
          case 3:
            playDholBass(0, false, 110);
            break;
          case 4:
            playDholBass(0, true, 120);
            playDholTreble(0, false, 390);
            break;
          case 5:
            playDholTreble(0, true, 440);
            break;
          case 6:
            playDholBass(0, false, 110);
            break;
          case 7:
            playDholTreble(0, true, 450);
            break;
        }
      }

      stepRef.current += 1;
    }, intervalMs);

    return () => {
      if (rhythmTimerRef.current) {
        clearInterval(rhythmTimerRef.current);
        rhythmTimerRef.current = null;
      }
    };
  }, [isPlayingDhol, selectedBeat, playDholBass, playDholTreble, playMarfaThapi]);

  // Select Beat Handler
  const handleSelectBeat = (beatId: BeatStyle) => {
    getAudioContext();
    setSelectedBeat(beatId);
    if (!isPlayingDhol) {
      setIsPlayingDhol(true);
    }
  };

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

  const handleTapMarfa = () => {
    playMarfaThapi(0, true);
    setActiveDrumHit("marfa");
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

  // Animation duration dynamically adapting to beat tempo
  const danceDuration =
    selectedBeat === "theenmaar"
      ? "0.85s"
      : selectedBeat === "bhutto"
      ? "1.0s"
      : selectedBeat === "marfa"
      ? "0.92s"
      : "1.15s";

  return (
    <section className="relative w-full bg-gradient-to-b from-[#18040A] via-[#2A0B14] to-[#150308] text-cream-warm pt-20 sm:pt-24 pb-8 px-4 border-t-2 border-gold-antique/40 overflow-hidden select-none">
      {/* Keyframe Styles for Smooth Front-View Dancing */}
      <style jsx>{`
        @keyframes frontDanceSwayLeft {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(-3.5deg); }
          50% { transform: translateY(-2px) rotate(0deg); }
          75% { transform: translateY(-12px) rotate(3.5deg); }
        }
        @keyframes frontDanceSwayRight {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-12px) rotate(3.5deg); }
          50% { transform: translateY(-2px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-3.5deg); }
        }
        @keyframes frontDrumStrike {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.03); }
        }
        @keyframes elephantGentleSway {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(1deg); }
        }
        @keyframes drumRippleWave {
          0% { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .anim-dance-male {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: frontDanceSwayLeft ${danceDuration} ease-in-out infinite;
        }
        .anim-dance-female {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: frontDanceSwayRight ${danceDuration} ease-in-out infinite;
        }
        .anim-drum-striker {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: frontDrumStrike ${selectedBeat === "theenmaar" ? "0.42s" : "0.52s"} ease-in-out infinite;
        }
        .anim-elephant-sway {
          transform-box: fill-box;
          transform-origin: 50% 100%;
          animation: elephantGentleSway 2.2s ease-in-out infinite;
        }
        .anim-drum-ripple {
          transform-box: fill-box;
          transform-origin: 50% 50%;
          animation: drumRippleWave 0.5s ease-out infinite;
        }
      `}</style>

      {/* Background Decorative Sparkles & Light Beam */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,161,91,0.15),transparent_70%)] pointer-events-none" />

      {/* Floating Animated Notes when drums are playing */}
      {isPlayingDhol && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute left-[10%] bottom-28 text-gold-champagne/80 text-xl animate-bounce duration-700">♪</span>
          <span className="absolute left-[22%] bottom-36 text-gold-light/70 text-2xl animate-pulse">🥁</span>
          <span className="absolute left-[38%] bottom-32 text-gold-champagne/90 text-lg animate-bounce duration-500">♫</span>
          <span className="absolute left-[50%] bottom-44 text-gold-light/80 text-xl animate-pulse">✨</span>
          <span className="absolute left-[62%] bottom-36 text-gold-champagne/80 text-lg animate-bounce duration-600">🪘</span>
          <span className="absolute left-[76%] bottom-30 text-gold-light/90 text-2xl animate-pulse">♬</span>
          <span className="absolute left-[88%] bottom-40 text-gold-champagne/70 text-xl animate-bounce duration-500">🎺</span>
        </div>
      )}

      <div className="relative max-w-5xl mx-auto text-center space-y-4">
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
            Enjoy the festive front view of joyful dancers, resounding wedding dhol drummers, and the regal elephant celebrating Kiran & Maheswari!
          </p>
        </div>

        {/* SELECTABLE WEDDING DRUM STYLES: THEEN MAAR | BHUTTO | HYDERABAD MARFA | ROYAL BAAJA */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#300A15]/90 border-2 border-gold-antique/60 shadow-royal max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="font-ceremonial text-[11px] sm:text-xs text-gold-champagne uppercase font-bold tracking-wider flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Select Wedding Drum Style (బీట్ ఎంచుకోండి):</span>
            </span>
            {isPlayingDhol && (
              <span className="text-[10px] font-ceremonial text-amber-300 font-bold uppercase tracking-wider animate-pulse flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping mr-1" />
                Live: {BEAT_STYLES.find((b) => b.id === selectedBeat)?.name}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BEAT_STYLES.map((beat) => {
              const isSelected = selectedBeat === beat.id;
              return (
                <button
                  key={beat.id}
                  onClick={() => handleSelectBeat(beat.id)}
                  className={`relative p-2.5 rounded-xl border transition-all duration-300 text-left flex flex-col justify-between ${
                    isSelected
                      ? `bg-gradient-to-r ${beat.color} text-cream-ivory border-gold-champagne shadow-gold-glow scale-[1.02] ring-2 ring-gold-champagne/60`
                      : "bg-[#1F070E] hover:bg-[#3D0E1C] text-gold-champagne/80 border-gold-antique/40 hover:border-gold-antique"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-bold text-sm sm:text-base leading-tight">
                      {beat.name}
                    </span>
                    {isSelected && isPlayingDhol && (
                      <Zap className="w-3.5 h-3.5 text-amber-200 animate-bounce" />
                    )}
                  </div>
                  <span className="font-ceremonial text-[10px] sm:text-[11px] font-semibold text-gold-light/90">
                    {beat.telugu}
                  </span>
                  <span className="text-[9px] text-cream-warm/70 mt-1 line-clamp-1 leading-tight">
                    {beat.tagline}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Toggle Bar (Front View vs Procession Panorama) */}
        <div className="flex items-center justify-center space-x-2 pt-1">
          <button
            onClick={() => setActiveTab("front")}
            className={`inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider uppercase transition-all ${
              activeTab === "front"
                ? "bg-gold-antique text-maroon font-bold shadow-md"
                : "bg-[#2A0B14] text-gold-champagne/70 border border-gold-antique/30 hover:text-gold-champagne"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>🌟 Front-View Dance Stage</span>
          </button>
          <button
            onClick={() => setActiveTab("procession")}
            className={`inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-semibold tracking-wider uppercase transition-all ${
              activeTab === "procession"
                ? "bg-gold-antique text-maroon font-bold shadow-md"
                : "bg-[#2A0B14] text-gold-champagne/70 border border-gold-antique/30 hover:text-gold-champagne"
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>🐘 Full Royal Procession Frieze</span>
          </button>
        </div>

        {/* Interactive Drum Playing Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-1 pb-2">
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
                <span>Pause {BEAT_STYLES.find((b) => b.id === selectedBeat)?.name} Drums</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-gold-champagne animate-bounce" />
                <span>🥁 Play {BEAT_STYLES.find((b) => b.id === selectedBeat)?.name}</span>
              </>
            )}
          </button>

          {/* Quick Tap Buttons */}
          <button
            onClick={handleTapBass}
            className={`px-3.5 py-2 rounded-full bg-[#350A17] border border-gold-antique/60 text-gold-champagne font-ceremonial text-xs uppercase tracking-wider hover:bg-[#521325] active:scale-95 transition-transform ${
              activeDrumHit === "bass" || (isPlayingDhol && (activeBeat === 0 || activeBeat === 4))
                ? "border-amber-400 bg-amber-900/60 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                : ""
            }`}
          >
            🥁 Dhol Bass (Dhum)
          </button>

          <button
            onClick={handleTapTreble}
            className={`px-3.5 py-2 rounded-full bg-[#350A17] border border-gold-antique/60 text-gold-champagne font-ceremonial text-xs uppercase tracking-wider hover:bg-[#521325] active:scale-95 transition-transform ${
              activeDrumHit === "treble" || (isPlayingDhol && (activeBeat === 2 || activeBeat === 5 || activeBeat === 7))
                ? "border-amber-400 bg-amber-900/60 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                : ""
            }`}
          >
            🪘 High Slap (Takk)
          </button>

          <button
            onClick={handleTapMarfa}
            className={`px-3.5 py-2 rounded-full bg-[#350A17] border border-gold-antique/60 text-gold-champagne font-ceremonial text-xs uppercase tracking-wider hover:bg-[#521325] active:scale-95 transition-transform ${
              activeDrumHit === "marfa" ? "border-amber-400 bg-amber-900/60 shadow-[0_0_12px_rgba(251,191,36,0.6)]" : ""
            }`}
          >
            🪵 Marfa Thapi
          </button>

          <button
            onClick={handleTapTutari}
            className={`px-3.5 py-2 rounded-full bg-[#350A17] border border-gold-antique/60 text-gold-champagne font-ceremonial text-xs uppercase tracking-wider hover:bg-[#521325] active:scale-95 transition-transform ${
              activeDrumHit === "tutari" ? "border-amber-400 bg-amber-900/60 shadow-[0_0_12px_rgba(251,191,36,0.6)]" : ""
            }`}
          >
            📯 Tutari Fanfare
          </button>
        </div>

        {/* =========================================================================
            STAGE VIEW 1: FRONT-VIEW DANCE & DRUM CELEBRATION STAGE (Default)
            "people can enjoy front view while dancing"
            Balanced 920px stage with dedicated non-overlapping columns!
            ========================================================================= */}
        {activeTab === "front" && (
          <div className="relative w-full max-w-4xl mx-auto rounded-3xl border-2 border-gold-antique/60 bg-gradient-to-b from-[#2E0B16] via-[#1F070E] to-[#150308] p-4 sm:p-6 shadow-2xl overflow-hidden transition-all duration-500">
            {/* Stage Inner Ornate Arch Inset */}
            <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-gold-champagne/20 pointer-events-none" />

            <div className="text-center mb-1">
              <span className="font-ceremonial text-[10px] sm:text-xs tracking-[0.25em] text-gold-champagne uppercase font-bold">
                {isPlayingDhol
                  ? `✨ DANCING TO ${BEAT_STYLES.find((b) => b.id === selectedBeat)?.name.toUpperCase()} (${BEAT_STYLES.find((b) => b.id === selectedBeat)?.telugu}) ✨`
                  : "✨ FRONT-VIEW WEDDING DANCE STAGE ✨"}
              </span>
            </div>

            {/* FRONT-VIEW SVG ILLUSTRATION (viewBox 0 0 920 300) */}
            <svg
              viewBox="0 0 920 300"
              className="w-full h-auto max-h-[300px] sm:max-h-[340px] filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="frontGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C6A15B" />
                  <stop offset="25%" stopColor="#FFF2D6" />
                  <stop offset="65%" stopColor="#E5C178" />
                  <stop offset="100%" stopColor="#9E7B36" />
                </linearGradient>

                <linearGradient id="lehengaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E8D6AD" />
                  <stop offset="35%" stopColor="#C6A15B" />
                  <stop offset="100%" stopColor="#641B2E" />
                </linearGradient>

                <linearGradient id="sherwaniGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF4DE" />
                  <stop offset="60%" stopColor="#C6A15B" />
                  <stop offset="100%" stopColor="#501222" />
                </linearGradient>

                <linearGradient id="drumFrontGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#501222" />
                  <stop offset="30%" stopColor="#C6A15B" />
                  <stop offset="70%" stopColor="#E8D6AD" />
                  <stop offset="100%" stopColor="#501222" />
                </linearGradient>
              </defs>

              {/* STAGE BACKDROP: HANGING MARIGOLD GARLANDS & BELLS */}
              <g opacity="0.65">
                <path
                  d="M0 16 Q 115 32, 230 16 Q 345 32, 460 16 Q 575 32, 690 16 Q 805 32, 920 16"
                  stroke="url(#frontGold)"
                  strokeWidth="1.5"
                  fill="none"
                />
                {[60, 160, 260, 360, 460, 560, 660, 760, 860].map((bx) => (
                  <g key={bx} transform={`translate(${bx}, 20)`}>
                    <line x1="0" y1="0" x2="0" y2="12" stroke="#C6A15B" strokeWidth="1" />
                    <path d="M-4 12 C-4 16, -6 20, -7 22 L7 22 C6 20, 4 16, 4 12 Z" fill="url(#frontGold)" />
                    <circle cx="0" cy="24" r="1.5" fill="#FFF2D6" />
                  </g>
                ))}
              </g>

              {/* AUSPICIOUS STAGE FLOOR BORDER */}
              <g transform="translate(0, 275)">
                <line x1="15" y1="0" x2="905" y2="0" stroke="url(#frontGold)" strokeWidth="2.5" />
                <line x1="25" y1="5" x2="895" y2="5" stroke="#C6A15B" strokeWidth="1" strokeDasharray="6 3" />
                {[90, 200, 320, 440, 560, 680, 800].map((fx) => (
                  <circle key={fx} cx={fx} cy="11" r="2.5" fill="url(#frontGold)" />
                ))}
              </g>

              {/* =========================================================================
                  COLUMN 1: ROYAL TUTARI / FANFARE BLOWER (Far Left - x ≈ 25)
                  ========================================================================= */}
              <g transform="translate(25, 45)">
                <g>
                  <circle cx="45" cy="80" r="9.5" fill="url(#frontGold)" />
                  <path d="M37 76 C37 62, 53 62, 53 76 Z" fill="url(#frontGold)" />
                  <path d="M38 90 L52 90 L56 150 L34 150 Z" fill="url(#sherwaniGrad)" />
                  <path d="M36 150 L32 230 L44 230 L47 190 L50 230 L62 230 L58 150 Z" fill="url(#sherwaniGrad)" />

                  <path d="M42 94 L58 85 L70 75" stroke="url(#frontGold)" strokeWidth="3.5" strokeLinecap="round" />
                  <path
                    d="M50 82 C65 82, 85 70, 85 45 C85 20, 50 10, 42 35 C38 50, 55 65, 75 70"
                    stroke="url(#frontGold)"
                    strokeWidth="3.5"
                    fill="none"
                  />
                  <path d="M38 32 L46 22 L50 40 Z" fill="url(#frontGold)" />
                  <path d="M46 30 C42 42, 34 50, 44 60 L40 55 Z" fill="#82263E" stroke="url(#frontGold)" strokeWidth="0.75" />
                </g>
              </g>

              {/* =========================================================================
                  COLUMN 2: THE REGAL ELEPHANT (Ambari Aenugu - x ≈ 115)
                  "riding elephant people drum"
                  ========================================================================= */}
              <g transform="translate(115, 30)">
                <g className={isPlayingDhol ? "anim-elephant-sway" : ""}>
                  <path d="M50 145 L45 245 L62 245 L66 150 Z" fill="url(#frontGold)" opacity="0.8" />
                  <path d="M75 140 L70 245 L90 245 L94 145 Z" fill="url(#frontGold)" />
                  <path d="M140 145 L135 245 L152 245 L156 145 Z" fill="url(#frontGold)" opacity="0.8" />
                  <path d="M162 140 L168 245 L188 245 L182 140 Z" fill="url(#frontGold)" />
                  <rect x="68" y="236" width="22" height="4" fill="#FFF2D6" rx="1" />
                  <rect x="166" y="236" width="22" height="4" fill="#FFF2D6" rx="1" />

                  <path
                    d="M40 130 C35 105, 65 85, 110 82 C150 80, 180 90, 192 105 C200 115, 195 145, 178 152 C145 160, 85 160, 50 150 Z"
                    fill="url(#frontGold)"
                  />

                  <path d="M42 120 C32 130, 34 160, 36 170" stroke="url(#frontGold)" strokeWidth="2.5" fill="none" />
                  <circle cx="36" cy="172" r="3" fill="#FFF2D6" />

                  <circle cx="190" cy="108" r="26" fill="url(#frontGold)" />
                  <path d="M172 95 C158 100, 158 130, 175 132 C185 128, 185 100, 172 95 Z" fill="#E8D6AD" stroke="url(#frontGold)" strokeWidth="1.5" />
                  <circle cx="170" cy="133" r="3" fill="#FFF2D6" />

                  <path
                    d="M205 112 C222 122, 235 155, 220 175 C210 185, 196 175, 200 165 C205 155, 222 148, 230 135 C235 125, 230 115, 222 118"
                    stroke="url(#frontGold)"
                    strokeWidth="7"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path d="M228 114 C232 104, 242 104, 238 114 C242 118, 232 122, 228 114 Z" fill="#FFF2D6" />
                  <path d="M206 122 C220 130, 228 126, 230 118" stroke="#FFFDF9" strokeWidth="3" strokeLinecap="round" fill="none" />

                  <path
                    d="M65 92 L172 92 C172 130, 162 148, 118 150 C75 148, 65 130, 65 92 Z"
                    fill="url(#lehengaGrad)"
                    stroke="url(#frontGold)"
                    strokeWidth="1.5"
                  />
                  <circle cx="118" cy="120" r="10" fill="url(#frontGold)" opacity="0.9" />
                  <circle cx="118" cy="120" r="5" fill="#82263E" />
                  {[75, 88, 101, 114, 127, 140, 153, 166].map((bx) => (
                    <circle key={bx} cx={bx} cy="150" r="2.5" fill="#FFF2D6" />
                  ))}

                  <rect x="90" y="70" width="56" height="12" fill="url(#frontGold)" rx="2" stroke="#FFF2D6" strokeWidth="1" />
                  <line x1="98" y1="70" x2="98" y2="38" stroke="url(#frontGold)" strokeWidth="2.5" />
                  <line x1="138" y1="70" x2="138" y2="38" stroke="url(#frontGold)" strokeWidth="2.5" />
                  <path d="M90 38 C90 22, 146 22, 146 38 Z" fill="url(#lehengaGrad)" stroke="url(#frontGold)" strokeWidth="1.5" />
                  <path d="M116 22 L120 22 L118 14 Z" fill="#FFF2D6" />
                  <path d="M118 14 L134 18 L118 22 Z" fill="#82263E" />

                  <circle cx="174" cy="66" r="6" fill="url(#frontGold)" />
                  <path d="M168 64 C168 56, 180 56, 180 64 Z" fill="#FFF2D6" />
                  <path d="M168 72 L180 72 L182 85 L166 85 Z" fill="url(#frontGold)" />
                </g>
              </g>

              {/* =========================================================================
                  COLUMN 3: FRONT-VIEW LEAD DHOL DRUMMER (x ≈ 345)
                  "drums playing - front view"
                  ========================================================================= */}
              <g transform="translate(345, 50)">
                <g className={isPlayingDhol ? "anim-drum-striker" : ""}>
                  <path d="M38 70 C34 50, 66 50, 62 70 Z" fill="url(#frontGold)" />
                  <path d="M36 58 L28 48 L38 52 Z" fill="#FFF2D6" />
                  <circle cx="50" cy="74" r="11" fill="url(#frontGold)" />
                  <path d="M44 78 Q 50 82, 56 78" stroke="#350A17" strokeWidth="1.5" fill="none" />

                  <path d="M34 86 L66 86 L70 145 L30 145 Z" fill="url(#sherwaniGrad)" />

                  {/* THE FRONT-FACING BARREL DHOL */}
                  <g transform="translate(50, 130)">
                    <ellipse cx="0" cy="0" rx="36" ry="22" fill="url(#drumFrontGrad)" stroke="url(#frontGold)" strokeWidth="2" />
                    <ellipse cx="-34" cy="0" rx="6" ry="21" fill="#FFFDF9" stroke="url(#frontGold)" strokeWidth="1.5" />
                    <ellipse cx="34" cy="0" rx="6" ry="21" fill="#FFFDF9" stroke="url(#frontGold)" strokeWidth="1.5" />

                    <path
                      d="M-34 0 L-18 20 L0 -20 L18 20 L34 0 M-34 0 L-18 -20 L0 20 L18 -20 L34 0"
                      stroke="#FFF2D6"
                      strokeWidth="1.2"
                      fill="none"
                    />
                    <circle cx="-9" cy="0" r="3" fill="#FFF2D6" />
                    <circle cx="9" cy="0" r="3" fill="#FFF2D6" />
                    <path d="M-28 18 C-30 26, -34 32, -32 36" stroke="#82263E" strokeWidth="2" fill="none" />
                    <path d="M28 18 C30 26, 34 32, 32 36" stroke="#82263E" strokeWidth="2" fill="none" />

                    {isPlayingDhol && (
                      <>
                        <circle cx="-34" cy="0" r="14" stroke="#FFF2D6" strokeWidth="1.5" fill="none" className="anim-drum-ripple" />
                        <circle cx="34" cy="0" r="16" stroke="#F59E0B" strokeWidth="1.5" fill="none" className="anim-drum-ripple" />
                      </>
                    )}
                  </g>

                  <path d="M34 86 L50 115 M66 86 L50 115" stroke="url(#frontGold)" strokeWidth="2" />

                  <path d="M32 90 L12 110 L16 128" stroke="url(#frontGold)" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="16" y1="128" x2="16" y2="132" stroke="#FFF2D6" strokeWidth="2.5" />

                  <path d="M68 90 L88 108 L84 126" stroke="url(#frontGold)" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M84 126 C88 128, 86 134, 82 132" stroke="#F59E0B" strokeWidth="3" fill="none" />

                  <path
                    d="M32 145 L22 190 L18 225 L30 225 L36 190 L50 165 L64 190 L70 225 L82 225 L78 190 L68 145 Z"
                    fill="url(#sherwaniGrad)"
                    stroke="url(#frontGold)"
                    strokeWidth="1"
                  />
                  <path d="M14 225 L31 225 L30 221 L16 221 Z" fill="#350A17" />
                  <path d="M69 225 L86 225 L84 221 L71 221 Z" fill="#350A17" />
                </g>
              </g>

              {/* =========================================================================
                  COLUMN 4: FRONT-VIEW MALE DANCER (Center - x ≈ 460)
                  "people can enjoy front view - dancing"
                  ========================================================================= */}
              <g transform="translate(460, 50)">
                <g className={isPlayingDhol ? "anim-dance-male" : ""}>
                  <path d="M38 72 C35 52, 65 52, 62 72 Z" fill="url(#frontGold)" />
                  <circle cx="50" cy="55" r="4" fill="#FFF2D6" />
                  <path d="M50 51 L53 38 L55 51 Z" fill="#FFF2D6" />
                  <circle cx="50" cy="76" r="12" fill="url(#sherwaniGrad)" />
                  <path d="M43 80 Q 50 85, 57 80" stroke="#350A17" strokeWidth="1.5" fill="none" />
                  <circle cx="37" cy="76" r="2" fill="#FFF2D6" />
                  <circle cx="63" cy="76" r="2" fill="#FFF2D6" />

                  <path
                    d="M32 90 L68 90 L74 150 L26 150 Z"
                    fill="url(#sherwaniGrad)"
                    stroke="url(#frontGold)"
                    strokeWidth="1.5"
                  />
                  <line x1="50" y1="90" x2="50" y2="150" stroke="#FFF2D6" strokeWidth="2" />
                  {[96, 108, 120, 132, 144].map((by) => (
                    <circle key={by} cx="50" cy={by} r="2" fill="#350A17" />
                  ))}

                  <path
                    d="M36 90 C36 108, 42 120, 40 160 L33 160 C35 120, 30 108, 30 90 Z"
                    fill="#82263E"
                    stroke="url(#frontGold)"
                    strokeWidth="0.75"
                  />
                  <path
                    d="M64 90 C64 108, 58 120, 60 160 L67 160 C65 120, 70 108, 70 90 Z"
                    fill="#82263E"
                    stroke="url(#frontGold)"
                    strokeWidth="0.75"
                  />

                  {/* Arms Raised High in Celebration (\ o /) */}
                  <path
                    d="M34 94 L14 62 L4 40"
                    stroke="url(#frontGold)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <circle cx="4" cy="38" r="4" fill="#FFF2D6" />

                  <path
                    d="M66 94 L86 62 L96 40"
                    stroke="url(#frontGold)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <circle cx="96" cy="38" r="4" fill="#FFF2D6" />

                  <path
                    d="M34 150 L26 195 L22 225 L34 225 L40 195 L50 170 L58 195 L68 225 L80 225 L74 195 L66 150 Z"
                    fill="url(#sherwaniGrad)"
                    stroke="url(#frontGold)"
                    strokeWidth="1"
                  />
                  <path d="M18 225 L35 225 L34 221 L20 221 Z" fill="#350A17" />
                  <path d="M67 225 L84 225 L82 221 L69 221 Z" fill="#350A17" />
                </g>
              </g>

              {/* =========================================================================
                  COLUMN 5: FRONT-VIEW FEMALE DANCER (Center-Right - x ≈ 575)
                  "graceful front view dancing"
                  ========================================================================= */}
              <g transform="translate(575, 50)">
                <g className={isPlayingDhol ? "anim-dance-female" : ""}>
                  <path d="M36 68 C34 50, 66 50, 64 68 Z" fill="#2A0B14" />
                  <line x1="50" y1="52" x2="50" y2="64" stroke="#FFF2D6" strokeWidth="2" />
                  <circle cx="50" cy="65" r="3" fill="#FFF2D6" />
                  <circle cx="38" cy="58" r="2.5" fill="#FFFDF9" />
                  <circle cx="43" cy="53" r="2.5" fill="#FFFDF9" />
                  <circle cx="57" cy="53" r="2.5" fill="#FFFDF9" />
                  <circle cx="62" cy="58" r="2.5" fill="#FFFDF9" />

                  <circle cx="50" cy="74" r="11" fill="url(#frontGold)" />
                  <circle cx="50" cy="72" r="1.5" fill="#82263E" />
                  <circle cx="38" cy="76" r="2.5" fill="#FFF2D6" />
                  <circle cx="62" cy="76" r="2.5" fill="#FFF2D6" />

                  <path d="M42 86 C46 95, 54 95, 58 86" stroke="#FFF2D6" strokeWidth="2" fill="none" />
                  <path d="M39 88 C45 102, 55 102, 61 88" stroke="#FFF2D6" strokeWidth="1.5" fill="none" />

                  <path d="M36 86 L64 86 L60 115 L40 115 Z" fill="#82263E" stroke="url(#frontGold)" strokeWidth="1" />

                  <path
                    d="M36 90 L16 70 L24 45"
                    stroke="url(#frontGold)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="23" cy="48" r="4" stroke="#FFF2D6" strokeWidth="1.5" fill="none" />
                  <circle cx="24" cy="43" r="3.5" fill="#FFF2D6" />

                  <path
                    d="M64 90 L84 70 L76 45"
                    stroke="url(#frontGold)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="77" cy="48" r="4" stroke="#FFF2D6" strokeWidth="1.5" fill="none" />
                  <circle cx="76" cy="43" r="3.5" fill="#FFF2D6" />

                  <path
                    d="M40 115 L60 115 C72 150, 96 185, 102 225 L-2 225 C4 185, 28 150, 40 115 Z"
                    fill="url(#lehengaGrad)"
                    stroke="url(#frontGold)"
                    strokeWidth="2"
                  />

                  <path d="M4 215 C34 203, 66 203, 96 215" stroke="#FFF2D6" strokeWidth="2" fill="none" />
                  <path d="M2 221 C34 209, 66 209, 98 221" stroke="#FFF2D6" strokeWidth="2.5" fill="none" />

                  <path
                    d="M18 68 C22 105, 30 135, 36 150"
                    stroke="#E8D6AD"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    fill="none"
                  />
                  <path
                    d="M82 68 C78 105, 70 135, 64 150"
                    stroke="#E8D6AD"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                    fill="none"
                  />
                </g>
              </g>

              {/* =========================================================================
                  COLUMN 6: FRONT-VIEW MARFA / DAPPU DRUMMER (x ≈ 695)
                  ========================================================================= */}
              <g transform="translate(695, 50)">
                <g className={isPlayingDhol ? "anim-dance-male" : ""}>
                  <circle cx="50" cy="74" r="10" fill="url(#frontGold)" />
                  <path d="M40 70 C36 54, 64 54, 60 70 Z" fill="#82263E" />
                  <path d="M36 86 L64 86 L68 145 L32 145 Z" fill="url(#sherwaniGrad)" />

                  <path d="M62 90 L82 65 L88 45" stroke="url(#frontGold)" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="90" cy="40" r="18" fill="url(#drumFrontGrad)" stroke="url(#frontGold)" strokeWidth="2" />
                  <circle cx="90" cy="40" r="13" stroke="#FFF2D6" strokeWidth="1" fill="none" />
                  <line x1="76" y1="40" x2="104" y2="40" stroke="#FFF2D6" strokeWidth="1.5" />

                  <path d="M36 90 L18 75 L22 58" stroke="url(#frontGold)" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="22" cy="56" r="3.5" fill="#FFF2D6" />

                  <path
                    d="M34 145 L28 190 L24 225 L36 225 L42 190 L50 165 L58 190 L64 225 L76 225 L72 190 L66 145 Z"
                    fill="url(#sherwaniGrad)"
                    stroke="url(#frontGold)"
                    strokeWidth="1"
                  />
                </g>
              </g>

              {/* =========================================================================
                  COLUMN 7: CHEERING FRIEND & WELL-WISHER (Far Right - x ≈ 805)
                  ========================================================================= */}
              <g transform="translate(805, 50)">
                <g className={isPlayingDhol ? "anim-dance-female" : ""}>
                  <circle cx="48" cy="72" r="9.5" fill="url(#frontGold)" />
                  <path d="M38 70 C38 56, 58 56, 58 70 Z" fill="url(#frontGold)" />
                  <path d="M38 86 L58 86 L62 145 L34 145 Z" fill="url(#sherwaniGrad)" />

                  <path d="M38 90 L20 70 L16 52" stroke="url(#frontGold)" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M58 90 L76 70 L80 52" stroke="url(#frontGold)" strokeWidth="3.5" strokeLinecap="round" />

                  <path
                    d="M36 145 L28 190 L24 225 L36 225 L42 190 L50 165 L58 190 L64 225 L76 225 L72 190 L66 145 Z"
                    fill="url(#sherwaniGrad)"
                    stroke="url(#frontGold)"
                    strokeWidth="1"
                  />
                </g>
              </g>
            </svg>

            {/* Stage Caption */}
            <p className="font-ceremonial text-xs sm:text-sm tracking-[0.2em] text-gold-champagne/90 uppercase pt-2">
              Dancing in Joyous Celebration of Sai Kiran & Gangalla Maheswari
            </p>
          </div>
        )}

        {/* =========================================================================
            STAGE VIEW 2: PANORAMIC ROYAL WEDDING PROCESSION FRIEZE
            ========================================================================= */}
        {activeTab === "procession" && (
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

                {/* Hanging Bells */}
                <g opacity="0.65">
                  <path
                    d="M0 12 Q 100 28, 200 12 Q 300 28, 400 12 Q 500 28, 600 12 Q 700 28, 800 12 Q 900 28, 1000 12 Q 1100 28, 1200 12"
                    stroke="url(#procGold)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {[50, 150, 250, 350, 450, 550, 650, 750, 850, 950, 1050, 1150].map((bx) => (
                    <g key={bx} transform={`translate(${bx}, 18)`}>
                      <line x1="0" y1="0" x2="0" y2="10" stroke="#C6A15B" strokeWidth="1" />
                      <path d="M-4 10 C-4 14, -6 18, -7 20 L7 20 C6 18, 4 14, 4 10 Z" fill="url(#procGold)" />
                      <circle cx="0" cy="22" r="1.5" fill="#E8D6AD" />
                    </g>
                  ))}
                </g>

                {/* Ground */}
                <g transform="translate(0, 218)">
                  <line x1="0" y1="0" x2="1200" y2="0" stroke="url(#procGold)" strokeWidth="2" />
                  <line x1="0" y1="4" x2="1200" y2="4" stroke="#C6A15B" strokeWidth="0.75" strokeDasharray="6 3" />
                  {[60, 180, 300, 420, 540, 660, 780, 900, 1020, 1140].map((fx) => (
                    <circle key={fx} cx={fx} cy="10" r="2" fill="url(#procGold)" />
                  ))}
                </g>

                {/* FIGURE 1: TUTARI HORN BLOWER */}
                <g transform="translate(45, 0)">
                  <circle cx="50" cy="115" r="9" fill="url(#procGold)" />
                  <path d="M42 114 C42 104, 58 104, 58 114 Z" fill="url(#procGold)" />
                  <path d="M54 105 C54 98, 62 100, 60 106 Z" fill="#FFF2D6" />
                  <path d="M42 124 L58 124 L62 165 L38 165 Z" fill="url(#procGold)" />
                  <path d="M40 165 L36 215 L46 215 L49 175 L52 215 L62 215 L58 165 Z" fill="url(#procGold)" />
                  <path d="M45 130 L65 125 L75 110" stroke="url(#procGold)" strokeWidth="4" strokeLinecap="round" />
                  <path
                    d="M58 118 C70 120, 85 110, 85 85 C85 55, 50 45, 45 75 C42 95, 62 110, 80 115"
                    stroke="url(#procGold)"
                    strokeWidth="3.5"
                    fill="none"
                  />
                  <path d="M40 70 L48 62 L52 78 Z" fill="url(#procGold)" />
                  <path d="M48 68 C44 80, 36 90, 48 100 L44 95 Z" fill="#82263E" stroke="url(#procGold)" strokeWidth="0.75" />
                </g>

                {/* FIGURE 2: SHAHNAI PLAYER */}
                <g transform="translate(130, 0)">
                  <circle cx="45" cy="120" r="8.5" fill="url(#procGold)" />
                  <path d="M38 118 C38 108, 52 108, 52 118 Z" fill="url(#procGold)" />
                  <path d="M38 128 L52 128 L56 168 L34 168 Z" fill="url(#procGold)" />
                  <path d="M36 168 L32 215 L42 215 L45 178 L48 215 L58 215 L54 168 Z" fill="url(#procGold)" />
                  <path d="M42 132 L58 135 L75 142" stroke="url(#procGold)" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="48" y1="124" x2="88" y2="148" stroke="url(#procGold)" strokeWidth="3" />
                  <path d="M85 142 L94 148 L87 154 Z" fill="#FFF2D6" stroke="url(#procGold)" strokeWidth="1" />
                </g>

                {/* FIGURE 3: DHOL DRUMMER 1 */}
                <g
                  transform="translate(215, 0)"
                >
                  <circle cx="50" cy="115" r="9" fill="url(#procGold)" />
                  <path d="M41 114 C41 102, 59 102, 59 114 Z" fill="url(#procGold)" />
                  <path d="M47 104 L53 96 L56 104 Z" fill="#FFF2D6" />
                  <path d="M40 124 L60 124 L64 162 L36 162 Z" fill="url(#procGold)" />
                  <path d="M38 162 L30 190 L34 215 L45 215 L42 190 L56 190 L54 215 L66 215 L62 162 Z" fill="url(#procGold)" />
                  <g transform="translate(50, 150) rotate(-12)">
                    <ellipse cx="0" cy="0" rx="24" ry="16" fill="url(#drumGrad)" stroke="url(#procGold)" strokeWidth="1.5" />
                    <ellipse cx="-22" cy="0" rx="4" ry="15" fill="#E8D6AD" stroke="url(#procGold)" strokeWidth="1" />
                    <ellipse cx="22" cy="0" rx="4" ry="15" fill="#E8D6AD" stroke="url(#procGold)" strokeWidth="1" />
                    <path d="M-22 0 L-10 14 L4 -14 L18 14 L22 0" stroke="#FFF2D6" strokeWidth="0.8" fill="none" />
                  </g>
                  <path d="M42 125 L65 155" stroke="url(#procGold)" strokeWidth="1.5" />
                  <path d="M40 128 L24 140 L28 152" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M60 128 L76 138 L72 150" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* FIGURE 4: DANCING MALE BARAATI */}
                <g
                  transform="translate(315, 0)"
                >
                  <circle cx="50" cy="108" r="9" fill="url(#procGold)" />
                  <path d="M40 106 C40 94, 60 94, 60 106 Z" fill="url(#procGold)" />
                  <circle cx="50" cy="95" r="3" fill="#FFF2D6" />
                  <path d="M42 118 L58 118 L62 155 L38 155 Z" fill="url(#procGold)" />
                  <path d="M42 122 L26 100 L18 85" stroke="url(#procGold)" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M58 122 L74 100 L82 85" stroke="url(#procGold)" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M22 96 C28 115, 38 125, 42 122" stroke="#82263E" strokeWidth="2.5" fill="none" />
                  <path d="M78 96 C72 115, 62 125, 58 122" stroke="#82263E" strokeWidth="2.5" fill="none" />
                  <path d="M40 155 L34 185 L30 215 L40 215 L45 185 L58 175 L70 190 L65 198 L56 182 L48 155 Z" fill="url(#procGold)" />
                </g>

                {/* FIGURE 5: DANCING FEMALE BARAATI */}
                <g
                  transform="translate(410, 0)"
                >
                  <circle cx="45" cy="114" r="8" fill="url(#procGold)" />
                  <path d="M38 112 C38 102, 52 102, 52 112 Z" fill="url(#procGold)" />
                  <line x1="45" y1="104" x2="45" y2="110" stroke="#FFF2D6" strokeWidth="1.5" />
                  <path d="M38 116 C30 125, 32 140, 26 150" stroke="url(#procGold)" strokeWidth="2.5" fill="none" />
                  <path d="M38 122 L52 122 L50 142 L40 142 Z" fill="url(#procGold)" />
                  <path d="M38 124 L22 110 L26 95" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M52 124 L68 115 L62 100" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                  <path
                    d="M40 142 L50 142 C56 165, 78 190, 80 215 L10 215 C12 190, 34 165, 40 142 Z"
                    fill="url(#clothGold)"
                    stroke="url(#procGold)"
                    strokeWidth="1.5"
                  />
                  <path d="M14 205 C38 198, 62 198, 76 205" stroke="#FFF2D6" strokeWidth="1" fill="none" />
                  <path d="M12 212 C38 206, 62 206, 78 212" stroke="#FFF2D6" strokeWidth="1" fill="none" />
                </g>

                {/* FIGURE 6: SECOND DHOL DRUMMER */}
                <g transform="translate(495, 0)">
                  <circle cx="48" cy="116" r="8.5" fill="url(#procGold)" />
                  <path d="M40 114 C40 104, 56 104, 56 114 Z" fill="url(#procGold)" />
                  <path d="M38 125 L58 125 L60 165 L36 165 Z" fill="url(#procGold)" />
                  <path d="M38 165 L34 215 L44 215 L48 180 L52 215 L62 215 L58 165 Z" fill="url(#procGold)" />
                  <g transform="translate(48, 152) rotate(14)">
                    <ellipse cx="0" cy="0" rx="22" ry="15" fill="url(#drumGrad)" stroke="url(#procGold)" strokeWidth="1.5" />
                    <ellipse cx="-20" cy="0" rx="3.5" ry="14" fill="#E8D6AD" stroke="url(#procGold)" strokeWidth="1" />
                    <ellipse cx="20" cy="0" rx="3.5" ry="14" fill="#E8D6AD" stroke="url(#procGold)" strokeWidth="1" />
                  </g>
                  <path d="M38 128 L20 142" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M58 128 L72 144" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* FIGURE 7: ROYAL ELEPHANT WITH HOWDAH */}
                <g transform="translate(590, 0)" className={isPlayingDhol ? "anim-elephant-sway" : ""}>
                  <path d="M85 160 L80 215 L98 215 L102 165 Z" fill="url(#procGold)" opacity="0.85" />
                  <path d="M110 155 L105 215 L125 215 L128 160 Z" fill="url(#procGold)" />
                  <rect x="79" y="206" width="20" height="4" fill="#FFF2D6" rx="1" />
                  <rect x="104" y="206" width="22" height="4" fill="#FFF2D6" rx="1" />

                  <path d="M175 160 L170 215 L188 215 L192 160 Z" fill="url(#procGold)" opacity="0.85" />
                  <path d="M195 155 L200 215 L220 215 L215 155 Z" fill="url(#procGold)" />
                  <rect x="169" y="206" width="20" height="4" fill="#FFF2D6" rx="1" />
                  <rect x="199" y="206" width="22" height="4" fill="#FFF2D6" rx="1" />

                  <path
                    d="M70 145 C65 115, 95 95, 140 92 C190 90, 220 100, 230 115 C240 125, 235 155, 215 165 C175 175, 115 175, 80 165 Z"
                    fill="url(#procGold)"
                  />

                  <path d="M72 135 C60 145, 62 175, 64 185" stroke="url(#procGold)" strokeWidth="2.5" fill="none" />
                  <circle cx="64" cy="186" r="3" fill="#FFF2D6" />

                  <circle cx="230" cy="120" r="28" fill="url(#procGold)" />
                  <path d="M210 105 C195 110, 195 140, 215 145 C225 140, 225 110, 210 105 Z" fill="#E8D6AD" stroke="url(#procGold)" strokeWidth="1.5" />
                  <circle cx="206" cy="146" r="3" fill="#FFF2D6" />

                  <path
                    d="M245 125 C265 135, 275 170, 260 190 C250 200, 235 190, 240 178 C245 168, 265 160, 275 145 C280 135, 275 125, 268 128"
                    stroke="url(#procGold)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path d="M272 125 C275 115, 285 115, 282 125 C285 128, 275 132, 272 125 Z" fill="#FFF2D6" />
                  <path d="M248 135 C262 142, 272 140, 275 130" stroke="#FFFDF9" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <rect x="256" y="133" width="3" height="5" fill="#E8D6AD" />

                  <path d="M228 98 L244 114 L236 126 L224 118 Z" fill="url(#clothGold)" stroke="#FFF2D6" strokeWidth="1" />
                  <circle cx="234" cy="112" r="3" fill="#FFF2D6" />

                  <path
                    d="M95 105 L205 105 C205 145, 195 165, 150 168 C105 165, 95 145, 95 105 Z"
                    fill="url(#clothGold)"
                    stroke="url(#procGold)"
                    strokeWidth="1.5"
                  />
                  <circle cx="150" cy="135" r="12" fill="url(#procGold)" opacity="0.9" />
                  <circle cx="150" cy="135" r="6" fill="#82263E" />
                  {[108, 122, 136, 150, 164, 178, 192].map((bx) => (
                    <circle key={bx} cx={bx} cy="168" r="2.5" fill="#FFF2D6" />
                  ))}

                  <rect x="120" y="80" width="60" height="14" fill="url(#procGold)" rx="2" stroke="#FFF2D6" strokeWidth="1" />
                  <line x1="122" y1="86" x2="178" y2="86" stroke="#82263E" strokeWidth="1" />
                  <line x1="128" y1="80" x2="128" y2="45" stroke="url(#procGold)" strokeWidth="3" />
                  <line x1="172" y1="80" x2="172" y2="45" stroke="url(#procGold)" strokeWidth="3" />
                  <path d="M120 45 C120 28, 180 28, 180 45 Z" fill="url(#clothGold)" stroke="url(#procGold)" strokeWidth="1.5" />
                  <path d="M148 28 L152 28 L150 20 Z" fill="#FFF2D6" stroke="url(#procGold)" strokeWidth="1" />
                  <path d="M150 20 L168 25 L150 30 Z" fill="#82263E" stroke="url(#procGold)" strokeWidth="0.75" />

                  <circle cx="212" cy="74" r="7" fill="url(#procGold)" />
                  <path d="M205 72 C205 64, 220 64, 220 72 Z" fill="#FFF2D6" />
                  <path d="M206 81 L220 81 L222 96 L202 96 Z" fill="url(#procGold)" />
                  <line x1="216" y1="80" x2="232" y2="68" stroke="#FFF2D6" strokeWidth="2" />
                  <path d="M232 68 C236 65, 236 72, 230 73" stroke="#FFF2D6" strokeWidth="1.5" fill="none" />
                </g>

                {/* FIGURE 8: UMBRELLA BEARER */}
                <g transform="translate(895, 0)">
                  <circle cx="45" cy="122" r="8" fill="url(#procGold)" />
                  <path d="M38 120 C38 110, 52 110, 52 120 Z" fill="url(#procGold)" />
                  <path d="M38 130 L52 130 L54 170 L36 170 Z" fill="url(#procGold)" />
                  <path d="M38 170 L34 215 L44 215 L48 180 L52 215 L60 215 L56 170 Z" fill="url(#procGold)" />
                  <line x1="48" y1="135" x2="48" y2="35" stroke="url(#procGold)" strokeWidth="2.5" />
                  <path d="M18 35 C18 12, 78 12, 78 35 Z" fill="url(#clothGold)" stroke="url(#procGold)" strokeWidth="1.5" />
                  <line x1="48" y1="12" x2="48" y2="4" stroke="#FFF2D6" strokeWidth="2" />
                  <line x1="18" y1="35" x2="78" y2="35" stroke="#FFF2D6" strokeWidth="2" strokeDasharray="4 2" />
                </g>

                {/* FIGURE 9: DAPPU DRUMMER */}
                <g
                  transform="translate(980, 0)"
                >
                  <circle cx="45" cy="118" r="8" fill="url(#procGold)" />
                  <path d="M38 116 C38 106, 52 106, 52 116 Z" fill="url(#procGold)" />
                  <path d="M38 126 L52 126 L56 166 L34 166 Z" fill="url(#procGold)" />
                  <path d="M36 166 L30 215 L40 215 L45 178 L50 215 L60 215 L56 166 Z" fill="url(#procGold)" />
                  <path d="M42 130 L54 110 L68 95" stroke="url(#procGold)" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="70" cy="92" r="14" fill="url(#drumGrad)" stroke="url(#procGold)" strokeWidth="1.5" />
                  <circle cx="70" cy="92" r="10" stroke="#FFF2D6" strokeWidth="0.75" fill="none" />
                  <line x1="58" y1="92" x2="82" y2="92" stroke="#FFF2D6" strokeWidth="1.5" />
                </g>

                {/* FIGURE 10: DANCING FRIEND */}
                <g
                  transform="translate(1065, 0)"
                >
                  <circle cx="48" cy="112" r="8.5" fill="url(#procGold)" />
                  <path d="M38 110 C38 98, 58 98, 58 110 Z" fill="url(#procGold)" />
                  <path d="M40 120 L56 120 L60 158 L36 158 Z" fill="url(#procGold)" />
                  <path d="M40 125 L24 105 L20 90" stroke="url(#procGold)" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M56 125 L72 105 L78 90" stroke="url(#procGold)" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M38 158 L32 188 L34 215 L44 215 L46 185 L56 185 L54 215 L64 215 L60 158 Z" fill="url(#procGold)" />
                </g>
              </svg>
            </div>
          </div>
        )}

        {/* Auspicious Note Below Procession */}
        <p className="font-ceremonial text-[11px] sm:text-xs tracking-[0.2em] text-gold-champagne/90 uppercase pt-1">
          May the beats of the wedding dhol & the melody of the nadaswaram fill their lives with eternal bliss!
        </p>

        <GoldDivider className="my-2" symbol="om" />
      </div>
    </section>
  );
}
