import { useState } from 'react';
import './Calendar.css';
import Day from './Day';
import Schedule from './Schedule';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const renderDays = () => {
    const days = [];
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = daysOfWeek[(startDay + i - 1) % 7];
      days.push(<Day key={i} day={dayOfWeek} dayNumber={i} onClick={handleDayClick} />);
    }

    return days;
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
    setSelectedYear(newDate.getFullYear());
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
    setSelectedYear(newDate.getFullYear());
  };

  const handleDayClick = (dayNumber, dayOfWeek) => {
    setSelectedDay(dayNumber);
    setSelectedDayOfWeek(dayOfWeek);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="calendar">
      <div className="header">
        <button className="btn prev" onClick={handlePrevMonth}>Prev</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
        <button className="btn next" onClick={handleNextMonth}>Next</button>
      </div>
      <div className="days">
        {renderDays()}
      </div>
      <div className="footer">
        {selectedDay && <Schedule day={selectedDay} dayOfWeek={selectedDayOfWeek} year={selectedYear} modalIsOpen={modalIsOpen} closeModal={closeModal} />}
        <p>Daniel Martin &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Calendar;