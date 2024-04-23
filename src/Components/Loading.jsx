import React from 'react'; 
import { useState, useEffect } from 'react';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

// Loading component that manages a progress bar animation and content display
const Loading = ({ setProgress }) => { 

    const [now, setNow] = useState(0); // State for the current progress value
    const [fadeOut, setFadeOut] = useState(false); // State to control fade-out effect on completion

    useEffect(() => {
        document.body.classList.add('custom-body'); // Add a custom class to the body for specific styles
        // Set an interval to simulate progress
        const intervalId = setInterval(() => {
            setNow((prevNow) => {
                const nextNow = prevNow + 5; // Increment progress
                if (nextNow >= 100) {
                    clearInterval(intervalId); // Stop the interval when 100% is reached
                    setFadeOut(true); // Initiate fade out effect
                    setTimeout(() => {
                        setProgress(100); // Notify parent component that loading is complete
                    }, 500); // Delay the completion notification to allow for fade-out effect
                    return 100;
                }
                return nextNow; // Update progress
            });
        }, 100); // Update every 100 milliseconds

        // Cleanup function to clear interval on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // Determine the CSS class based on fadeOut state to apply fade-out effects
    const loadingStyle = fadeOut ? 'loading-content fade-out' : 'loading-content'; // Apply fade-out class


    return (
        <div className={loadingStyle}>
            <p className='pet-lab-welcome'>Welcome to</p>
            <h1 className='pet-lab-title'>PET LAB</h1>
            <h2 className='pet-lab-subtitle'>Find the Breed That Speaks to Your Heart!</h2>
            <p className='loading-text'>Loading...</p>
            <ProgressBar 
                className='custom-progress'
                style={{ width: '50%', height: '25px', margin: '10px auto'}}
                animated
                now={now} // Current progress
            />

            <p className='loading-num'>{`${now}%`}</p> // Display numerical value of progress
        </div>
); }; 

export default Loading;