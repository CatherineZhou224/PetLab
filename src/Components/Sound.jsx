import React, { useState, useRef} from "react";

import bgm from "../assets/pet-lab-bgm.flac";
import { Button, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const Sound = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);
  
    const initializeAudio = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio(bgm);
        audioRef.current.loop = true; // Enable looping
  
        // Update progress as audio plays
        audioRef.current.addEventListener('timeupdate', () => {
          const updatedProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(updatedProgress);
        });
  
        // Reset progress when audio ends (useful if looping is turned off later)
        audioRef.current.addEventListener('ended', () => {
          setProgress(0);
          setIsPlaying(false);
        });
      }
    };
  
    const togglePlayPause = () => {
      initializeAudio();  // Ensure audio is initialized
  
      // Toggle play/pause based on current state
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
  
      setIsPlaying(!isPlaying);
    };
  
    return (
      <div className="audio-wrapper">

        <Button 
            onClick={togglePlayPause} 
            className="audio-button"
            >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </Button>

        <ProgressBar 
            className='custom-progress-2'
            animated
            now={progress} 
            label={`${Math.round(progress)}%`} />
            
      </div>
    );
  };
  
  export default Sound;