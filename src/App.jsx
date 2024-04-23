import React, { useState, useEffect } from "react";
import "./App.css";
import Loading from "./Components/Loading";
import MainContent from "./Components/MainContent";

const App = () => {
  // using progress state to manage returning loading page or main content page
  const [progress, setProgress] = useState(0);

  return progress !== 100 ? (
    <Loading setProgress={setProgress} />
  ) : (
    <MainContent />
  );
};

export default App;
