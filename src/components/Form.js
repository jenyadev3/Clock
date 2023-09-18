import React, { useState } from 'react';
import Clock from './Clock';

function Form() {
  const [form, setForm] = useState({ city: '', time: '' });
  const [clockData, setClockData] = useState(null);

  const fetchData = async (city) => {
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/Europe/${city}`);
      const data = await response.json();
      const currentTime = data.datetime;
      const [hours, minutes, seconds] = currentTime.split(':').map(Number);
        // часы в формате 12-часового времени (AM/PM)
      let formattedHours = hours;
      let amPm = 'AM';
      if (hours >= 12) {
       amPm = 'PM';
      formattedHours = hours > 12 ? hours - 12 : hours;
     }
     const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${amPm}`;
      setForm({ ...form, time: formattedTime});
    } catch (error) {
      console.error('Некорректная временная зона:', error);
    }
  };

  const handleCityChange = (evt) => {
    const city = evt.target.value.trim();
    setForm({ ...form, city: city });
  }

  const handleTimeChange = () => {
    fetchData(form.city);
  }

  const handleAddClick = (evt) => {
    evt.preventDefault();
    setClockData(form.time);
  }

  return (
    <div className="container">
      <div className="forms-wrap">
        <label htmlFor="inputCity">Название</label>
        <input
          id="inputCity"
          type="text"
          onChange={handleCityChange}
          onBlur={handleTimeChange}
          value={form.city}
        />
        <label htmlFor="inputTime">Временная зона</label>
        <input
          id="timeInput"
          type="text"
          value={form.time}
        />
        <button onClick={handleAddClick}>Добавить</button>
      </div>
      <Clock data={clockData}/>
    </div>
  )
}

export default Form;