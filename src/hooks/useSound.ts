"use client";

import { useEffect, useRef, useCallback } from "react";

interface AudioNodes {
  ctx: AudioContext | null;
  droneOsc1: OscillatorNode | null;
  droneOsc2: OscillatorNode | null;
  filterNode: BiquadFilterNode | null;
  gainNode: GainNode | null;
  lfoNode: OscillatorNode | null;
}

export function useSound() {
  const nodesRef = useRef<AudioNodes>({
    ctx: null,
    droneOsc1: null,
    droneOsc2: null,
    filterNode: null,
    gainNode: null,
    lfoNode: null,
  });
  const isPlayingRef = useRef(false);

  const initSound = useCallback(() => {
    if (nodesRef.current.ctx) return;

    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    const droneOsc1 = ctx.createOscillator();
    droneOsc1.type = "sine";
    droneOsc1.frequency.value = 55;

    const droneOsc2 = ctx.createOscillator();
    droneOsc2.type = "triangle";
    droneOsc2.frequency.value = 55.3;

    const filterNode = ctx.createBiquadFilter();
    filterNode.type = "lowpass";
    filterNode.frequency.value = 110;
    filterNode.Q.value = 1;

    const lfoNode = ctx.createOscillator();
    lfoNode.type = "sine";
    lfoNode.frequency.value = 0.08;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 30;

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0;

    lfoNode.connect(lfoGain);
    lfoGain.connect(filterNode.frequency);
    droneOsc1.connect(filterNode);
    droneOsc2.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    droneOsc1.start();
    droneOsc2.start();
    lfoNode.start();

    nodesRef.current = { ctx, droneOsc1, droneOsc2, filterNode, gainNode, lfoNode };
  }, []);

  const toggleSound = useCallback(() => {
    const nodes = nodesRef.current;
    if (!nodes.ctx) {
      initSound();
    }

    const ctx = nodesRef.current.ctx;
    if (ctx?.state === "suspended") {
      ctx.resume();
    }

    const gain = nodesRef.current.gainNode;
    if (!gain) return;

    if (!isPlayingRef.current) {
      gain.gain.linearRampToValueAtTime(0.04, (ctx?.currentTime ?? 0) + 1.5);
      isPlayingRef.current = true;
      return true;
    } else {
      gain.gain.linearRampToValueAtTime(0, (ctx?.currentTime ?? 0) + 1.0);
      isPlayingRef.current = false;
      return false;
    }
  }, [initSound]);

  return { toggleSound, isPlayingRef };
}
