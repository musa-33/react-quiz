import CheckBox from "./CheckBox";
import classes from '../styles/Answers.module.css'

export default function Answers() {
    return (
        <div className={classes.answers}>
            <CheckBox className={classes.answer} text="A New Hope 1" />
            <CheckBox className={classes.answer} text="A New Hope 2" />
            <CheckBox className={classes.answer} text="A New Hope 3" />
            <CheckBox className={classes.answer} text="A New Hope 4" />
            <CheckBox className={classes.answer} text="A New Hope 5" />
            <CheckBox className={classes.answer} text="A New Hope 6" />
            <CheckBox className={classes.answer} text="A New Hope 7" />
            <CheckBox className={classes.answer} text="A New Hope 8" />
            <CheckBox className={classes.answer} text="A New Hope 9" />
            <CheckBox className={classes.answer} text="A New Hope 10" />
        </div>
    );
}