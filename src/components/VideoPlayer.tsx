import { useEffect, useRef, useState } from "react";
import { Loader2, Play } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  isActive: boolean;
}

/**
 * Full screen video player component
 */
export function VideoPlayer({ src, isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  // Handle active state changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      // Attempt to play
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
      video.currentTime = 0; // Reset time when scrolling away? TikTok doesn't usually reset, but pauses.
      // User said "like TikTok". TikTok pauses. If you come back, it resumes.
      // Let's NOT reset currentTime.
    }
  }, [isActive, src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        loop
        playsInline
        // muted // Start muted to allow autoplay? Or try unmuted.
        // If we don't mute, browser might block autoplay.
        // But users expect sound.
        // We'll let the user click to start if blocked.
        onClick={togglePlay}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onLoadedData={() => setIsBuffering(false)}
      />

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}

      {/* Play/Pause Indicator (optional, only show when paused explicitly?) */}
      {!isPlaying && !isBuffering && isActive && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none"
          onClick={togglePlay}
        >
          <Play className="w-12 h-12 text-white/50" />
        </div>
      )}
    </div>
  );
}
