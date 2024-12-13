import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './Schedule.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Schedule = ({ day, dayOfWeek, year, modalIsOpen, closeModal }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events for the specific day from an API or a data source
        const fetchEvents = async () => {
            // Replace with your data fetching logic
            const response = await fetch(`/api/events?day=${day}`);
            const data = await response.json();
            setEvents(data);
        };

        fetchEvents();
    }, [day]);

    const getDaySuffix = (day) => {
        if (day > 3 && day < 21) return 'th'; // Covers 11th to 20th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Schedule Modal"
            className="schedule-modal"
            overlayClassName="schedule-overlay"
        >
            <div className="schedule">
                <h3>Schedule for {dayOfWeek} {day}{getDaySuffix(day)}, {year}</h3>
                {events.length > 0 ? (
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>{event.name} at {event.time}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No events scheduled for this day.</p>
                )}
                <button onClick={closeModal}>Close</button>
            </div>
        </Modal>
    );
};

Schedule.propTypes = {
    day: PropTypes.number.isRequired,
    dayOfWeek: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default Schedule;