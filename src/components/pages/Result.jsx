import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswerList from "../../hooks/useAnswerList";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Result() {
  const { id } = useParams();
  const location = useLocation();
  const { qna } = location.state;
  const { answers, error, loading } = useAnswerList(id);

  function scoreCalculation() {
    let score = 0;
    answers.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (
          qna &&
          qna[index1] &&
          qna[index1].options &&
          qna[index1].options[index2] &&
          qna[index1].options[index2].checked
        ) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5;
      }
    });
    return score;
  }

  return (
    <>
      {loading && <div>Loading....</div>}
      {error && <div>Something went wrong!</div>}
      {!loading && !error && answers && answers.length && (
        <>
          <Summary score={scoreCalculation()} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
