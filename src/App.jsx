import React, { useState, useEffect } from 'react';
import "./App.css";
import Loading from './Components/Loading';
import MainContent from './Components/MainContent';
import { getCatInfo } from "./utils/utils";
// import bgm from "./src/assets/pet-lab-bgm.flac";



const App = () => {

  // loading
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  //idk if this is the correct way to check whether fetching is compelte or not
  useEffect(() => {
    getCatInfo().then(() => {
      // This will set isLoading to false when the fetch is complete,
      // but we will also need to check this against the progress bar status.
      setIsLoading(false);
    });
  }, []);

  return (isLoading || progress !== 100) ? <Loading setProgress={setProgress} /> : <MainContent />;
};

export default App;
