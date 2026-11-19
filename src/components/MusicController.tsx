"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export function MusicController() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Tanpura & Shehnai synthesis using Web Audio API
  // Raga: Mohanam / Bhupali (Sacred auspicious morning/evening wedding raag: Sa, Ri2, Ga3, Pa, Dha2)
  const notes = [
    261.63, // C4 (Sa)
    293.66, // D4 (Ri)
    329.63, // E4 (Ga)
    392.00, // G4 (Pa)
    440.00, // A4 (Dha)
    523.25, // C5 (Higher Sa)
    659.25, // E5 (Higher Ga)
  ];

  const playNote = (ctx: AudioContext, freq: number, duration: number, timeOffset: number) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Shehnai-like reed timbre: triangle wave with mild distortion & resonant peak
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + timeOffset);

      // Portamento / subtle meend (Indian microtonal slide)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.01, ctx.currentTime + timeOffset + 0.1);
      osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + timeOffset + 0.25);

      // Warm acoustic filter simulating wooden shehnai pipe
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime + timeOffset);
      filter.Q.setValueAtTime(4.0, ctx.currentTime + timeOffset);

      // Gentle acoustic envelope (soft attack, sustained, slow decay)
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + timeOffset);
      gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + timeOffset + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.02, ctx.currentTime + timeOffset + duration * 0.7);
      gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + timeOffset + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + timeOffset);
      osc.stop(ctx.currentTime + timeOffset + duration);
    } catch {
      // Audio node cleanup safeguard
    }
  };

  const playTanpuraDrone = (ctx: AudioContext) => {
    // Continuous sacred Tanpura drone on Pa (G) and Sa (C)
    const droneFreqs = [130.81, 196.0, 261.63]; // C3, G3, C4
    droneFreqs.forEach((freq) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Slow pulsating volume simulating the strumming cycle of a 4-string Tanpura
        gain.gain.setValueAtTime(0.012, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        // Keep drone alive while playing
        const timer = setInterval(() => {
          if (!isPlayingRef.current) {
            clearInterval(timer);
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          }
        }, 300);
      } catch {}
    });
  };

  const startMusic = async () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) {
        setIsSupported(false);
        return;
      }

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }

      isPlayingRef.current = true;
      setIsPlaying(true);

      const ctx = audioCtxRef.current;
      playTanpuraDrone(ctx);

      // Auspicious melody sequence (Mohanam raag phrase)
      const melodySequence = [
        { note: notes[0], dur: 1.8 }, // Sa
        { note: notes[1], dur: 1.2 }, // Ri
        { note: notes[2], dur: 2.0 }, // Ga
        { note: notes[3], dur: 1.5 }, // Pa
        { note: notes[4], dur: 1.5 }, // Dha
        { note: notes[5], dur: 2.4 }, // Sa^
        { note: notes[4], dur: 1.4 }, // Dha
        { note: notes[3], dur: 1.6 }, // Pa
        { note: notes[2], dur: 2.0 }, // Ga
        { note: notes[1], dur: 1.4 }, // Ri
        { note: notes[0], dur: 3.0 }, // Sa
      ];

      let noteIndex = 0;
      const playNextMelodyCycle = () => {
        if (!isPlayingRef.current) return;
        const currentItem = melodySequence[noteIndex];
        playNote(ctx, currentItem.note, currentItem.dur, 0);
        noteIndex = (noteIndex + 1) % melodySequence.length;

        const nextDelay = currentItem.dur * 900;
        intervalRef.current = setTimeout(playNextMelodyCycle, nextDelay);
      };

      playNextMelodyCycle();
    } catch (err) {
      console.warn("Audio playback initialization notice:", err);
    }
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      try {
        audioCtxRef.current.suspend();
      } catch {}
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  if (!isSupported) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute traditional wedding music" : "Play traditional wedding music"}
        className={`flex items-center space-x-2.5 px-3.5 py-2.5 rounded-full border transition-all duration-300 shadow-royal backdrop-blur-md ${
          isPlaying
            ? "bg-[#641B2E]/95 border-[#C6A15B] text-gold-champagne ring-2 ring-gold-antique/40 shadow-gold-glow animate-pulse-subtle"
            : "bg-[#42101F]/85 border-[#C6A15B]/40 text-cream-ivory hover:border-gold-antique hover:bg-[#641B2E]"
        }`}
        title={isPlaying ? "Click to pause wedding music" : "Click to play auspicious wedding melody (Nadaswaram & Tanpura)"}
      >
        <div className="relative">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-gold-champagne animate-bounce" />
          ) : (
            <VolumeX className="w-5 h-5 text-cream-warm opacity-80" />
          )}
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-heading tracking-wider font-semibold uppercase leading-tight">
            {isPlaying ? "Music Playing" : "Wedding Music"}
          </span>
          <span className="text-[9px] font-body text-gold-champagne/80 tracking-normal">
            {isPlaying ? "Traditional Shehnai & Drone" : "Tap to Play"}
          </span>
        </div>
      </button>
    </div>
  );
}
