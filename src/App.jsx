import React, { useState, useEffect } from 'react';
import "./App.css";
import Loading from './Components/Loading';
import MainContent from './Components/MainContent';
import { getCatInfo } from "./utils/utils";
// import bgm from "./src/assets/pet-lab-bgm.flac";



const App = () => {

  // loading
  const [progress, setProgress] = useState(0);


  return (progress !== 100) ? <Loading setProgress={setProgress} /> : <MainContent />;
};

export default App;
