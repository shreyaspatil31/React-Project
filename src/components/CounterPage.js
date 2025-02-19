import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Button } from "@mui/material"; // Material UI button
import "../styles/CounterPage.css";

const CounterPage = () => {

  // Load count from localStorage on initial render
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  // Save count to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  // Function to calculate background height using a cubic Bezier curve
  const calculateHeight = (count) => {
    const t = Math.min(count / 100, 1); 
    const bezierY = t < 0.5 
      ? 4 * t * t * t
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; 
    return bezierY * 100; // Convert to percentage
  };

  // Animated background effect based on count
  const backgroundAnimation = useSpring({
    height: `${calculateHeight(count)}%`,
    config: { tension: 100, friction: 20 }, // Spring animation settings
  });

  // Button handlers
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <div className="counter-page">
      <div className="counter-container">
        {/* Animated background fill */}
        <animated.div className="background-fill" style={backgroundAnimation} />
        <div className="counter-content">
          <h2>Counter</h2>
          <div className="count-display">{count}</div>
          <div className="button-group">
            <Button variant="contained" color="primary" onClick={decrement}>Decrement</Button>
            <Button variant="contained" color="secondary" onClick={reset}>Reset</Button>
            <Button variant="contained" color="success" onClick={increment}>Increment</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterPage;
