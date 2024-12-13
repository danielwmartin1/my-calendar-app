// Day.jsx
import './Day.css';
import PropTypes from 'prop-types';

const Day = ({ day, dayNumber, onClick }) => {
    return (
        <div className="day" onClick={() => onClick(dayNumber)}>
            <span className="day-name">{day}</span>
            <span className="day-number">{dayNumber}</span>
        </div>
    );
};

Day.propTypes = {
    day: PropTypes.string.isRequired,
    dayNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Day;
