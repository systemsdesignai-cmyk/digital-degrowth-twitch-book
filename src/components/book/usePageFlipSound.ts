import { useEffect, useRef } from "react";

const PAGE_FLIP_AUDIO_SRC = "/audios/page-flip-01a.mp3";

export const usePageFlipSound = (page: number, enabled: boolean) => {
  const previousPage = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(PAGE_FLIP_AUDIO_SRC);
    audioRef.current.preload = "auto";

    return () => {
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      previousPage.current = null;
      return;
    }

    if (previousPage.current === null) {
      previousPage.current = page;
      return;
    }

    if (previousPage.current === page) {
      return;
    }

    previousPage.current = page;

    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(() => {
      // Browsers may block playback until the user interacts with the page.
    });
  }, [enabled, page]);
};
