import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";

const Loading = ({ setProgress }) => {
  const [now, setNow] = useState(0);
  const [fadeOut, setFadeOut] = useState(false); // State to trigger fade-out

  useEffect(() => {
    document.body.classList.add("custom-body");
    //fake progress bar with constant progressing speed
    const intervalId = setInterval(() => {
      setNow((prevNow) => {
        const nextNow = prevNow + 5;
        if (nextNow >= 100) {
          clearInterval(intervalId);
          setFadeOut(true); // When the progress hits 100, start the fade-out
          setTimeout(() => {
            setProgress(100);
          }, 500);
          return 100;
        }
        return nextNow;
      });
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Apply fade-out class
  const loadingStyle = fadeOut ? "loading-content fade-out" : "loading-content";

  return (
    <div className={loadingStyle}>
      <p className="pet-lab-welcome">Welcome to</p>
      <h1 className="pet-lab-title">PET LAB</h1>
      <h2 className="pet-lab-subtitle">
        Find the Breed That Speaks to Your Heart!
      </h2>
      <p className="loading-text">Loading...</p>
      <ProgressBar
        className="custom-progress"
        style={{ width: "50%", height: "25px", margin: "10px auto" }}
        animated
        now={now}
      />

      <p className="loading-num">{`${now}%`}</p>
    </div>
  );
};

export default Loading;
