import { useState } from 'react';

const useVisualMode = (initial) => {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {

    if (replace) {
      history.push(initial);
      // history.pop()?
    }
    // history.push(newMode);
    setHistory([...history, newMode]);
    setMode(newMode);
      // copy history array
      // const copyHistory = [...history, newMode]

    }
  
  function back() {
    // const copyHistory = [...history]
    // console.log('before', copyHistory)
    // copyHistory.pop()
    // console.log('after', copyHistory)

    if (history.length > 1) {
      history.pop()
   
      setMode(history[history.length-1])

    }
  

  }

  return { mode, transition, back }
};

export default useVisualMode;