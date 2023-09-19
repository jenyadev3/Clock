import React, { useState, useEffect } from 'react';

function Clock({data}) {
  const [hourRotation, setHourRotation] = useState(0);
  const [minuteRotation, setMinuteRotation] = useState(0);
  const [secondRotation, setSecondRotation] = useState(0);

  useEffect(() => {
    if (!data) return;
    const intervalId = setInterval(() => {
      const [hours, minutes, seconds] = data.split(':').map(Number);
      // угловые значения для стрелок
      const hourAngle = hours * 30;
      const minuteAngle = minutes * 6; 
      const secondAngle = (seconds / 5) * 30; 
      console.log(minuteAngle)
      setHourRotation(hourAngle);
      setMinuteRotation(minuteAngle);
      setSecondRotation(secondAngle);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  const hourStyle = {
    transform: `rotate(${hourRotation}deg)`,
  };


  const minuteStyle = {
    transform: `rotate(${minuteRotation}deg)`,
  };

  const secondStyle = {
    transform: `rotate(${secondRotation}deg)`,
  };

  return (
    <div className="clock">
      <div className="top"></div>
      <div className="right"></div>
      <div className="bottom"></div>
      <div className="left"></div>
      <div className="center"></div>
      <div className="hour" style={hourStyle}></div>
      <div className="minute" style={minuteStyle}></div>
      <div className="second" style={secondStyle}></div>
    </div>
  )
}

export default Clock;