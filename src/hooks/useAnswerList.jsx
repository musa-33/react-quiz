import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswerList(videoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      const db = getDatabase();
      const answerRef = ref(db, `answers/${videoId}/questions`);
      const answerQuery = query(answerRef, orderByKey());

      try {
        setLoading(true);
        setError(false);
        const snapshot = await get(answerQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswers((currentAnswer) => {
            const newAnswers = Object.values(snapshot.val());
            // Filter out duplicates based on youtubeID
            const uniqueAnswers = newAnswers.filter(
              (newAnswer) =>
                !currentAnswer.some(
                  (existingAnswer) =>
                    existingAnswer.youtubeID === newAnswer.youtubeID
                )
            );
            return [...currentAnswer, ...uniqueAnswers];
          });
        }
      } catch (e) {
        console.log(e);
        setError(true);
        setLoading(false);
      }
    }

    fetchAnswers();
  }, [videoId]);

  return {
    loading,
    error,
    answers,
  };
}
