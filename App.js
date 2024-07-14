import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatepickerStyles.css'; 



import './App.css';

const activities = [
  'Wake up',
  'Go to gym',
  'Breakfast',
  'Meetings',
  'Lunch',
  'Quick nap',
  'Go to library',
  'Dinner',
  'Go to sleep'
];

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const App = () => {
  const [reminders, setReminders] = useState([]);
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedActivity, setSelectedActivity] = useState(activities[0]);

  const addReminder = () => {
    setReminders([
      ...reminders,
      {
        day: selectedDay,
        time: selectedTime,
        activity: selectedActivity
      }
    ]);
  };

  const playChime = () => {
    const audio = new Audio('https://www.soundjay.com/button/sounds/button-10.mp3');
    audio.play();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach(reminder => {
        if (
          reminder.day === daysOfWeek[now.getDay()] &&
          reminder.time.getHours() === now.getHours() &&
          reminder.time.getMinutes() === now.getMinutes()
        ) {
          playChime();
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [reminders]);

  return (
    <div className="App">
      <div className='main'>
      <h1>Daily Reminder App</h1>
      <div className="form">
        <label>
          Day:
          <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </label>
        <label>
          Time: 
          <DatePicker 
            selected={selectedTime}
            onChange={(date) => setSelectedTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </label>
        <label>
          Activity:
          <select value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)}>
            {activities.map(activity => (
              <option key={activity} value={activity}>{activity}</option>
            ))}
          </select>
        </label>
        <button onClick={addReminder}>Add Reminder</button>
      </div>
      <div className="reminders">
        <h2>Scheduled Reminders</h2>
        <ul>
          {reminders.map((reminder, index) => (
            <li key={index}>
              {reminder.day} - {reminder.time.toLocaleTimeString()} - {reminder.activity}
            </li>
          ))}
        </ul>
      </div>

      </div>
    </div>
  );
};

export default App;
