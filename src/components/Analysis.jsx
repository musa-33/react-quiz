import Question from "../components/Question";
import classes from "../styles/Analysis.module.css";

export default function Analysis() {
  return (
    <div className={classes.analysis}>
      <h1>Question Analysis</h1>
      <h4>You answered 5 out of 10 questions correctly</h4>
      <Question />
    </div>
  );
}
