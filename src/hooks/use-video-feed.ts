import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook to manage video feed
 * @param themeUrl - The API URL for the current video theme
 */
export function useVideoFeed(themeUrl: string) {
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchingRef = useRef(false);

  /**
   * Fetches a single video URL by hitting the API and resolving the redirect
   */
  const fetchVideo = useCallback(async () => {
    try {
      // We append a timestamp to ensure we don't hit browser cache for the API call itself
      const response = await fetch(
        `${themeUrl}&t=${Date.now()}-${Math.random()}`,
        {
          method: "GET",
          // We attempt to get the redirected URL.
          // If CORS allows, response.url will be the final MP4 URL.
        },
      );

      if (response.url) {
        return response.url;
      }
      return null;
    } catch (e) {
      console.error("Failed to fetch video", e);
      // Fallback: If fetch fails (e.g. CORS), we return the API URL with a timestamp.
      // This is not ideal for "caching" as going back might show a different video,
      // but it's the best we can do without a backend proxy.
      return `${themeUrl}&t=${Date.now()}-${Math.random()}`;
    }
  }, [themeUrl]);

  /**
   * Loads more videos into the list
   * @param count - Number of videos to load
   */
  const loadMore = useCallback(
    async (count = 1) => {
      if (fetchingRef.current) return;
      fetchingRef.current = true;
      setLoading(true);

      const newVideos: string[] = [];
      // Fetch sequentially to avoid spamming the server or race conditions
      for (let i = 0; i < count; i++) {
        const url = await fetchVideo();
        if (url) {
          newVideos.push(url);
        }
      }

      if (newVideos.length > 0) {
        setVideos((prev) => [...prev, ...newVideos]);
      }

      setLoading(false);
      fetchingRef.current = false;
    },
    [fetchVideo],
  );

  // Reset videos when theme changes
  useEffect(() => {
    setVideos([]);
    loadMore(3); // Load initial batch of 3 videos
  }, [themeUrl]);

  return { videos, loadMore, loading };
}
