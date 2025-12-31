"use client"
//LottieAnimation
import React, { useEffect, useRef, useState } from 'react';

const LottieAnimation = ({ wh = 240, vb = 160, cx = 80, r = 70, sw = 3.5, sd = 10 }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    position: 'relative',
  };

  const circleRef = useRef(null);
  const [duration, setDuration] = useState(2.5); // start at 2.5s

  useEffect(() => {
    let current = 2.5;
    const interval = setInterval(() => {
      current -= 0.1;
      if (current <= 0.5) {
        current = 0.5;
        clearInterval(interval);
      }
      setDuration(current.toFixed(2));
    }, 500); // update every 200ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <svg width={wh} height={wh} viewBox={`0 0 ${vb} ${vb}`}>
        <defs>
          <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff0000" />
            <stop offset="25%" stopColor="#ffa500" />
            <stop offset="50%" stopColor="#ffff00" />
            <stop offset="75%" stopColor="#ff00ff" />
            <stop offset="100%" stopColor="#8000ff" />
          </linearGradient>
        </defs>
        <circle
          ref={circleRef}
          cx={cx}
          cy={cx} // same as cx to keep it centered
          r={r}
          fill="none"
          stroke="url(#grad)"
          strokeWidth={sw}
          strokeDasharray={`${sd} ${sd}`}
          strokeLinecap="round"
          style={{
            transformOrigin: "center",
            animation: `spin ${duration}s linear infinite`,
          }}
        />
      </svg>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LottieAnimation;
