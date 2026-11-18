
import { useRef, useState } from "react";

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      // Звук включается вместе с воспроизведением по нажатию пользователя.
      video.muted = false;
      try {
        await video.play();
      } catch {
        video.pause();
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  return (
    <main className="album-screen">
      <video
        ref={videoRef}
        className="album-video"
        src="/1113.mp4"
        loop
        playsInline
        preload="auto"
        onClick={togglePlayback}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            void togglePlayback();
          }
        }}
        tabIndex={0}
        role="button"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label={isPlaying ? "Приостановить видео" : "Продолжить видео"}
      />

    </main>
  );
}
