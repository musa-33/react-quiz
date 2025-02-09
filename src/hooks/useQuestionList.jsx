import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestionList(videoId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    async function fetchQuestion() {
      const db = getDatabase();
      const quizRef = ref(db, `quiz/${videoId}/questions`);
      const questionQuery = query(quizRef, orderByKey());

      try {
        setLoading(true);
        setError(false);
        const snapshot = await get(questionQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setQuestion((currentQuestions) => {
            const newQuestions = Object.values(snapshot.val());
            // Filter out duplicates based on youtubeID
            const uniqueQuestions = newQuestions.filter(
              (newQuestion) =>
                !currentQuestions.some(
                  (existingQuestion) =>
                    existingQuestion.title === newQuestion.title
                )
            );
            return [...currentQuestions, ...uniqueQuestions];
          });
        }
      } catch (e) {
        console.log(e);
        setError(true);
        setLoading(false);
      }
    }

    fetchQuestion();
  }, []);

  return {
    loading,
    error,
    questions,
  };
}
