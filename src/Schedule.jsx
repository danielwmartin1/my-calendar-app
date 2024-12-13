import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './Schedule.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Schedule = ({ day }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    useEffect(() => {
        console.log('Schedule component mounted');
        return () => {
            console.log('Schedule component unmounted');
            setModalIsOpen(false); // Ensure modal is closed on unmount
        };
    }, []);

    useEffect(() => {
        setModalIsOpen(false); // Ensure modal is closed on rerender
    }, [day]);

    return (
        <div>
            <button className="openSchedule" onClick={openModal}>Open Schedule</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Schedule Modal"
                className="schedule-modal"
                overlayClassName="schedule-overlay"
            >
                <div className="schedule">
                    <h3>Schedule for {day}</h3>
                    {/* Add your schedule details here */}
                    <p>No events scheduled for this day.</p>
                    <button onClick={closeModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
};

Schedule.propTypes = {
    day: PropTypes.number.isRequired,
};

export default Schedule;