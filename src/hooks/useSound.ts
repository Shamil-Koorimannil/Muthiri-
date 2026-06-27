"use client";

import { useEffect, useRef, useCallback } from "react";

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    // Create audio element on the client side
    const audio = new Audio("/assets/bg music.mp3");
    audio.loop = true;
    audio.volume = 0.3; // subtle background level
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlayingRef.current) {
      audio.play().catch((err) => {
        console.error("Audio play failed:", err);
      });
      isPlayingRef.current = true;
      return true;
    } else {
      audio.pause();
      isPlayingRef.current = false;
      return false;
    }
  }, []);

  return { toggleSound, isPlayingRef };
}
