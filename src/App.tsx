import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/swiper.css";

import { useVideoFeed } from "@/hooks/use-video-feed";
import { VIDEO_THEMES } from "@/lib/constants";
import type { ThemeId } from "@/lib/constants";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ThemeMenu } from "@/components/ThemeMenu";

export default function App() {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(
    VIDEO_THEMES[0].id,
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const currentTheme =
    VIDEO_THEMES.find((t) => t.id === currentThemeId) || VIDEO_THEMES[0];
  const { videos, loadMore, loading } = useVideoFeed(currentTheme.url);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);

    // Load more when getting close to the end (e.g., 2 slides remaining)
    if (swiper.activeIndex >= videos.length - 2) {
      loadMore(3);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden">
      <ThemeMenu
        currentTheme={currentThemeId}
        onThemeChange={(id) => {
          setCurrentThemeId(id);
          setActiveIndex(0);
        }}
      />

      <Swiper
        key={currentThemeId}
        direction="vertical"
        className="w-full h-full"
        modules={[Mousewheel]}
        mousewheel={true}
        onSlideChange={handleSlideChange}
      >
        {videos.map((url, index) => (
          <SwiperSlide key={`${index}-${url}`}>
            <VideoPlayer src={url} isActive={index === activeIndex} />
          </SwiperSlide>
        ))}

        {loading && videos.length === 0 && (
          <SwiperSlide>
            <div className="flex items-center justify-center w-full h-full text-white">
              加载中...
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
