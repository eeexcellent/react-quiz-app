import { useEffect, useState } from "react";

const FREQUENCY = 100;

export default function QuestionTimer({ timeout, onTimeout }) {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - FREQUENCY);
    }, FREQUENCY);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" value={timeRemaining} max={timeout} />;
}
