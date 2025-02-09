import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import useQuestionList from "../../hooks/useQuestionList.jsx";
import Answers from "../Answers.jsx";
import MiniPlayer from "../MiniPlayer.jsx";
import ProgressBar from "../ProgressBar.jsx";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answers":
      const questions = _.cloneDeep(state);
      questions[action.questionId].options[action.optionIndex].checked =
        action.value;
      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { questions, loading, error } = useQuestionList(id);
  const [qna, dispatch] = useReducer(reducer, initialState);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { videoTitle } = location.state;

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  const handleChange = (e, index) => {
    dispatch({
      type: "answers",
      questionId: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  };

  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  }

  function prevQuestion() {
    console.log("Next Question");
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  }

  async function handleSubmit() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });
    navigate(`/result/${id}`, {
      state: { qna },
    });
  }

  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  return (
    <>
      {loading && <div>Loading....</div>}
      {error && <div>Something went wrong!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input={true}
            options={qna[currentQuestion].options}
            handleChange={handleChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            submit={handleSubmit}
            progress={percentage}
          />
          <MiniPlayer title={videoTitle} id={id} />
        </>
      )}
    </>
  );
}
