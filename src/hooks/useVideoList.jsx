import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

export default function useVideoList(page) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      const db = getDatabase();
      const videoRef = ref(db, "videos");
      const videoQuery = query(
        videoRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(8)
      );

      try {
        setLoading(true);
        setError(false);
        const snapshot = await get(videoQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setVideos((currentVideos) => {
            const newVideos = Object.values(snapshot.val());
            // Filter out duplicates based on youtubeID
            const uniqueVideos = newVideos.filter(
              (newVideo) =>
                !currentVideos.some(
                  (existingVideo) =>
                    existingVideo.youtubeID === newVideo.youtubeID
                )
            );
            return [...currentVideos, ...uniqueVideos];
          });
        } else {
          setHasMore(false);
        }
      } catch (e) {
        console.log(e);
        setError(true);
        setLoading(false);
      }
    }

    fetchVideos();
  }, [page]);

  return {
    loading,
    error,
    videos,
    hasMore,
  };
}
