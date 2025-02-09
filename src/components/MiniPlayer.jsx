import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import classes from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({ id, title }) {
  const [status, setStatus] = useState(true);
  const buttonRef = useRef();
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  function togglePlayer() {
    if (status) {
      setStatus(false);
      buttonRef.current.classList.remove(classes.floatingBtn);
    } else {
      setStatus(true);
      buttonRef.current.classList.add(classes.floatingBtn);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
      onClick={togglePlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={togglePlayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        className={classes.player}
        url={videoUrl}
        width="300px"
        height="168px"
        playing={!status}
        controls
      />
      <p>{title}</p>
    </div>
  );
}
