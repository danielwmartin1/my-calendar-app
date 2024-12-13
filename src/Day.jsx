import React from 'react';

const Day = ({ day, onClick }) => {
  return (
    <div className="day" onClick={() => onClick(day)}>
      {day}
    </div>
  );
};

export default Day;