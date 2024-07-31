import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerModal.css'; // Import CSS for custom styles

const DatePickerModal = ({ onDateSelect, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDateSelect = () => {
    if (selectedDate) {
      onDateSelect(selectedDate);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select a Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          inline
        />
        <button onClick={handleDateSelect}>Select Date</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DatePickerModal;
