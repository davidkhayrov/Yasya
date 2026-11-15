
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
    } else {
      video.muted = false;
      try {
        await video.play();
        setSoundOn(true);
      } catch (error) {
        video.muted = true;
        setSoundOn(false);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 h-screen w-screen overflow-hidden bg-black"
      onClick={toggleSound}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/1113.MP4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSound();
          }}
          className="rounded-full bg-black/60 px-6 py-3 text-sm text-white"
        >
          {soundOn ? "Выключить звук" : "Включить звук"}
        </button>
      </div>
    </div>
  );
}
