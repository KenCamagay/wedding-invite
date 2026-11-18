"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function WeddingMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 const startMusic = useCallback(async () => {
  const audio = audioRef.current;
  if (!audio || !audio.paused) return;

  setLoading(true);
  setMessage("");

  try {
    audio.volume = 0.3;
    await audio.play();
  } catch {
    setMessage("Music couldn’t play. Tap to try again.");
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  const handleInvitationOpen = () => {
    void startMusic();
  };

  window.addEventListener("wedding:invitation-open", handleInvitationOpen);
  return () => {
    window.removeEventListener("wedding:invitation-open", handleInvitationOpen);
  };
}, [startMusic]);

function toggleMusic() {
  const audio = audioRef.current;
  if (!audio || loading) return;

  if (audio.paused) {
    void startMusic();
  } else {
    audio.pause();
  }
}

  return (
    <div className="wedding-music">
      <audio
        ref={audioRef}
        src="/audio/wedding-theme.mp3"
        preload="none"
        loop
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setPlaying(false)}
      />

      <button
        type="button"
        className="wedding-music-toggle"
        aria-label="Wedding music"
        aria-pressed={playing}
        onClick={toggleMusic}
        disabled={loading}
      >
        <span aria-hidden="true">♫</span>
        <span aria-hidden="true">
          {loading ? "Loading…" : playing ? "Music on" : "Music off"}
        </span>
      </button>

      {message && (
        <p className="wedding-music-message" role="status">
          {message}
        </p>
      )}
    </div>
  );
}