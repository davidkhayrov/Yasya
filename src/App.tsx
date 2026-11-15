import { useEffect, useRef, useState } from "react";

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => setNeedsTap(true));
  }, []);

  useEffect(() => {
    if (!needsTap) return;
    const enableSound = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = false;
      video.play().catch(() => {});
      setNeedsTap(false);
    };
    window.addEventListener("pointerdown", enableSound);
    window.addEventListener("keydown", enableSound);
    return () => {
      window.removeEventListener("pointerdown", enableSound);
      window.removeEventListener("keydown", enableSound);
    };
  }, [needsTap]);

  return (
    <div className="fixed inset-0 bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/intro.mp4"
        autoPlay
        loop
        playsInline
        controls={false}
      />
      {needsTap && (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-12">
          <p className="rounded-full bg-black/60 px-6 py-3 text-sm text-white">
            Нажмите в любом месте, чтобы включить звук
          </p>
        </div>
      )}
    </div>
  );
}
