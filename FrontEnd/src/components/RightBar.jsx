import React, { useState, useEffect } from 'react';

export default function RightBar({ logoutFunc, tasks, UserData, currentTasks }) {
    const [visibleSection, setVisibleSection] = useState('All1');
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expandedTask, setExpandedTask] = useState(null);

    // console.log("current tasks", currentTasks);

    const handleNavClick = (sectionId) => {
        setVisibleSection(sectionId);
    };

    const handleAddTaskClick = () => {
        setIsTaskFormVisible(true);
    };

    const handleCloseTaskForm = () => {
        setIsTaskFormVisible(false);
    };

    const handleArrowUpClick = () => {
        setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
    };

    const handleArrowDownClick = () => {
        setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
    };

    const newDate = selectedDate;
    const separator = "/";
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    let day = "";
    switch (newDate.getDay()) {
        case 1: day = "Monday"; break;
        case 2: day = "Tuesday"; break;
        case 3: day = "Wednesday"; break;
        case 4: day = "Thursday"; break;
        case 5: day = "Friday"; break;
        case 6: day = "Saturday"; break;
        case 0: day = "Sunday"; break;
        default: day = ""; break;
    }

    const calculateRemainingDays = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        const timeDiff = end - today; // Difference in milliseconds
        const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
        return remainingDays <= 0 ? 0 : remainingDays; // Return 0 if the date has passed
    };

    const today = new Date();
    const isToday = today.toDateString() === newDate.toDateString();

    const formatStartDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}`;
    };

    const handleTaskToggle = (index) => {
        setExpandedTask(expandedTask === index ? null : index); // Toggle the expanded task
    };

    const formatEndDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const hours1 = date.getHours() % 12 || 12;
        const hours = hours1.toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${day}/${month}, ${hours}:${minutes} ${ampm}`;
    };

    const filteredTasks = tasks.filter(task => {
        const taskEndDate = new Date(task.end_date);
        const diffDays = (taskEndDate - newDate) / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays < 7;
    }).sort((a, b) => new Date(a.end_date) - new Date(b.end_date));

    return (
        <>
            <div className="right-bar">
                <button className='Logout btn1' onClick={logoutFunc}>Logout <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="feather feather-users">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                </button>
                {/* <div className="top-part">
                <span></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="feather feather-users">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            </div> */}
                <div className="top-part">
                    <span></span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="feather feather-users">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                </div>
                <div className="right-content">
                    <div className="allDays">
                        <div className="day">
                            <div className="header"><b>Week</b> - Schedule</div>
                            {filteredTasks.length === 0 ? (
                                <div className="task-box yellow">
                                    <div className="description-task">
                                        <div className="time">9:30 - 10:30 AM</div>
                                        <div className="task-name">No tasks scheduled</div>
                                    </div>
                                </div>
                            ) : (
                                filteredTasks.map((currentTask, index) => (
                                    <div key={index} className={`task-box ${currentTask.tag.toLowerCase().replace(' ', '-')}`}>
                                        <div className="description-task">
                                            <div className="time">
                                                {currentTask.start_date && <span>{formatStartDate(currentTask.start_date)}</span>}
                                                -
                                                {currentTask.end_date && <span className='colorBlack' >{formatStartDate(currentTask.end_date)}</span>}
                                            </div>
                                            <div className="task-name">{currentTask.name}</div>
                                        </div>
                                        <div className="more-button colorBlack" onClick={() => handleTaskToggle(index)}>
                                            {expandedTask === index ? 'Less' : 'More'}
                                        </div>
                                        <div className="members">
                                            {currentTask.category}
                                        </div>
                                        {expandedTask === index && currentTask.description && (
                                            <div className="task-description1">
                                                <p className='p2 animateBottom'>
                                                    {/* {currentTask.description} */}
                                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit nostrum sed ab ad voluptate vero quasi neque eius saepe minima. Debitis, quam impedit aperiam amet ipsum ullam vero ex fugiat?
                                                </p>

                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
