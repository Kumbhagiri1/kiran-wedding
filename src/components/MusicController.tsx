"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music2 } from "lucide-react";

export function MusicController() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/audio/kalyanam-vaibhogam.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.75;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    // Listen for custom trigger from unsealing the royal envelope
    const handleStartMusicEvent = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay deferred until guest interaction:", err);
        });
    };

    window.addEventListener("start-wedding-music", handleStartMusicEvent);

    return () => {
      window.removeEventListener("start-wedding-music", handleStartMusicEvent);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Playback error:", err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause Kalyanam Vaibhogam wedding song" : "Play Kalyanam Vaibhogam wedding song"}
        className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-royal backdrop-blur-md cursor-pointer ${
          isPlaying
            ? "bg-[#641B2E]/95 border-[#C6A15B] text-gold-champagne ring-2 ring-gold-antique/50 shadow-gold-glow animate-pulse-subtle"
            : "bg-[#42101F]/90 border-[#C6A15B]/50 text-cream-ivory hover:border-gold-antique hover:bg-[#641B2E]"
        }`}
        title={isPlaying ? "Click to pause Kalyanam Vaibhogam" : "Click to play 'Kalyanam Vaibhogam' wedding song"}
      >
        <div className="relative">
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-gold-champagne animate-bounce" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-champagne opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-antique" />
              </span>
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-cream-warm opacity-80" />
          )}
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center space-x-1.5">
            <Music2 className="w-3 h-3 text-gold-antique" />
            <span className="text-[11px] font-heading tracking-wider font-bold uppercase leading-tight text-gold-light">
              Kalyanam Vaibhogam
            </span>
          </div>
          <span className="text-[9px] font-body text-cream-warm/90 tracking-normal">
            {isPlaying ? "Playing • Tap to Mute" : "Tap to Play Sacred Song"}
          </span>
        </div>
      </button>
    </div>
  );
}
