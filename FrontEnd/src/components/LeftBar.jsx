import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function LeftBar({ onCategoryChange, logoutFunc, onDateChange }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    // console.log('Selected Date:', selectedDate);
    onDateChange(selectedDate);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };
  // console.log(selectedDate)

  let newDate = selectedDate;
  let separator = "/";
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();


  return (
    <>
      {isModalOpen && (
        <div className="absolute calHome">
          <form className='calendar-modal' onSubmit={handleSubmit}>
            <Calendar onChange={handleDateSelect} value={selectedDate} />
            <button type="submit" className='form-button1'>Submit</button>
            <button type="button" className="form-button1" onClick={closeModal}>Cancel</button>
          </form>
        </div>
      )}
      <div className="left-bar">
        <div className="upper-part">
          <div className="actions">
            <div className="circle" onClick={logoutFunc}>
              <div className="circleSon c1"></div>
              <div className="circleSon c2"></div>
              <div className="circleSon c3"></div>
            </div>
            <div className="circle-2"></div>
          </div>
        </div>
        <div className="left-content">
          <ul className="action-list">
            <li className={`item ${selectedCategory === "All" ? 'selected' : ' '}`} onClick={() => handleCategoryClick('All')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>All</span>
            </li>
            <li className="item calendarButton selected" onClick={openModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-calendar" viewBox="0 0 24 24">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <path d="M16 2v4M8 2v4m-5 4h18" />
              </svg>
              <span>{date}{separator}{month < 10 ? `0${month}` : month}{separator}{year}</span>
            </li>

            <li className={`item ${selectedCategory === "Work" ? 'selected' : ' '}`} onClick={() => handleCategoryClick('Work')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-hash">
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
                <line x1="10" y1="3" x2="8" y2="21" />
                <line x1="16" y1="3" x2="14" y2="21" />
              </svg>
              <span>Work</span>
            </li>
            <li className={`item ${selectedCategory === "deleted" ? 'selected' : ' '}`} onClick={() => handleCategoryClick('deleted')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-trash" viewBox="0 0 24 24">
                <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>Trash</span>
            </li>
          </ul>
          <ul className="category-list">
            <li className={`item ${selectedCategory === "Personal" ? 'selected' : ' '}`} onClick={() => handleCategoryClick('Personal')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Personal</span>
            </li>
            <li className={`item ${selectedCategory === "General" ? 'selected' : ' '}`} onClick={() => handleCategoryClick('General')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-sun" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <span>General</span>
            </li>
            <li className={`item ${selectedCategory === "Festival" ? 'selected' : ' '}`} onClick={() => handleCategoryClick('Festival')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="feather feather-trending-up">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <span>Festival</span>
            </li>
            <li className={`item ${selectedCategory === "Concert" ? 'selected' : ' '}`} onClick={() => handleCategoryClick('Concert')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="feather feather-zap">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>Concerts</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
