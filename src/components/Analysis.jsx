import Question from "../components/Question";
import classes from "../styles/Analysis.module.css";

export default function Analysis({ answers }) {
  return (
    <div className={classes.analysis}>
      <h1>Question Analysis</h1>
      <Question answers={answers} />
    </div>
  );
}
