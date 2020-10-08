import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      history.push(initial);
  
    }
  
    setHistory([...history, newMode]);
    setMode(newMode);

  }

  function back() {


    if (history.length > 1) {
      history.pop();

      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
};

export default useVisualMode;
