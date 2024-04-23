import React, { useState, useRef} from "react";

import bgm from "../assets/pet-lab-bgm.flac";
import { Button, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

// The Sound component manages the audio playback.
const Sound = () => {
    const [isPlaying, setIsPlaying] = useState(false); // isPlaying state to toggle between play and pause
    const [progress, setProgress] = useState(0); // progress state to keep track of audio playback progress
    const audioRef = useRef(null); // useRef to refer to the audio element
  
    // Function to initialize the audio player
    const initializeAudio = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio(bgm); // Create a new audio object
        audioRef.current.loop = true; // Enable looping
  
        // Add event listener to update progress as audio plays
        audioRef.current.addEventListener('timeupdate', () => {
          const updatedProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(updatedProgress); // Update progress state
        });
  
        // Reset progress when audio ends (useful if looping is turned off later)
        audioRef.current.addEventListener('ended', () => {
          setProgress(0); // Reset progress
          setIsPlaying(false); // Update playing state
        });
      }
    };
    
    // Function to toggle play or pause
    const togglePlayPause = () => {
      initializeAudio();  // Ensure audio is initialized
  
      // Toggle play or pause based on isPlaying state
      if (isPlaying) {
        audioRef.current.pause(); // Pause the audio
      } else {
        audioRef.current.play(); // Play the audio
      }
  
      setIsPlaying(!isPlaying); // Toggle the isPlaying state
    };
  
    return (
      <div className="audio-wrapper">

        <Button 
            onClick={togglePlayPause} 
            className="audio-button"
            >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} /> // Display pause icon if playing, otherwise play icon
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