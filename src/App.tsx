
import { useRef, useState } from "react";

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (soundOn) {
      video.muted = true;
      setSoundOn(false);
      return;
    }

    video.muted = false;

    try {
      await video.play();
      setSoundOn(true);
    } catch {
      video.muted = true;
      setSoundOn(false);
    }
  };

  return (
    <main className="album-screen">
      <video
        ref={videoRef}
        className="album-video"
        src="/1113.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <button
        className="sound-button"
        onClick={toggleSound}
        aria-label={soundOn ? "Выключить звук" : "Включить звук"}
      >
        {soundOn ? "🔊 Выключить звук" : "🔇 Включить звук"}
      </button>
    </main>
  );
}
