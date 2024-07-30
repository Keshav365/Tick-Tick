import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCaretDown, faDemocrat, faTrash, faBoltLightning, faChartBar, faClock } from '@fortawesome/free-solid-svg-icons';
import TaskForm from './TaskForm'; // Make sure TaskForm component is properly imported
import KanbanBoard from './KanbanBoard.jsx';

export default function PageContent({ currenttasks, tasks, onAddTask, userId }) {
    const [visibleSection, setVisibleSection] = useState('All1');
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expandedTask, setExpandedTask] = useState(null);

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

    let newDate = selectedDate;
    let separator = "/";
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

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

    const filteredTasks = tasks.filter(task => {
        const taskStartDate = new Date(task.start_date);
        const taskEndDate = new Date(task.end_date);
        if (isToday) {
            return taskStartDate < today && taskEndDate > today;
        } else {
            return taskEndDate.toDateString() === newDate.toDateString();
        }
    }).sort((a, b) => new Date(a.end_date) - new Date(b.end_date));

    const upcomingTasks = tasks.filter(task => !task.completed && new Date(task.end_date) >= newDate)
                               .sort((a, b) => new Date(a.end_date) - new Date(b.end_date));

    const completedTasks = tasks.filter(task => task.completed)
                                .sort((a, b) => new Date(a.end_date) - new Date(b.end_date));

    // Function to format start_date
    const formatStartDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}/${date.getFullYear()}`;
    };

    const handleTaskToggle = (index) => {
        setExpandedTask(expandedTask === index ? null : index); // Toggle the expanded task
    };

    // Function to format end_date
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
    return (
        <div className="page-content">
            <div className="header">
                <div className="headerIcon">
                    <FontAwesomeIcon icon={faArrowUp} onClick={handleArrowDownClick} />
                    <FontAwesomeIcon icon={faArrowDown} onClick={handleArrowUpClick} />
                </div>
                &nbsp;&nbsp;
                <div className="headerName">Tasks for {isToday ? 'Today' : `${day}, ${date}${separator}${month < 10 ? "0" + month : month}${separator}${year}`}</div>
            </div>

            <div className="content-categories">
                <div className="label-wrapper">
                    <input
                        className="nav-item forAll1"
                        name="nav"
                        type="radio"
                        id="opt-1"
                        checked={visibleSection === 'All1'}
                        onChange={() => handleNavClick('All1')}
                    />
                    <label className="category" htmlFor="opt-1">All</label>
                </div>
                <div className="label-wrapper">
                    <input
                        className="nav-item forImportant"
                        name="nav"
                        type="radio"
                        id="opt-2"
                        checked={visibleSection === 'Important'}
                        onChange={() => handleNavClick('Important')}
                    />
                    <label className="category" htmlFor="opt-2">KanBan Board <FontAwesomeIcon icon={faChartBar}></FontAwesomeIcon> </label>
                </div>
                <div className="label-wrapper">
                    <input
                        className="nav-item forNotes"
                        name="nav"
                        type="radio"
                        id="opt-3"
                        checked={visibleSection === 'Notes'}
                        onChange={() => handleNavClick('Notes')}
                    />
                    <label className="category" htmlFor="opt-3">SupaDrive <FontAwesomeIcon icon={faBoltLightning}></FontAwesomeIcon> </label>
                </div>
                <div className="label-wrapper">
                    <input
                        className="nav-item forLinks"
                        name="nav"
                        type="radio"
                        id="opt-4"
                        checked={visibleSection === 'Links'}
                        onChange={() => handleNavClick('Links')}
                    />
                    <label className="category" htmlFor="opt-4">Links</label>
                </div>
            </div>

            <div className="tasks-wrapper" style={{ display: visibleSection === 'All1' ? 'block' : 'none' }} id="All1">
                <div className="task-wrapper">
                    {filteredTasks.length === 0 ? (
                        <div className='animateBottom'>No tasks available for {isToday ? 'today' : ` ${day}, ${date}${separator}${month < 10 ? "0" + month : month}${separator}${year}`}</div>
                    ) : (
                        filteredTasks.map((currentTask, index) => (
                            <div className="taskKaPapa">
                                <div className="task animateBottom" key={index}>
                                    <div className="taskNameDrop">
                                        <FontAwesomeIcon className='.task-icon' icon={faCaretDown} onClick={() => handleTaskToggle(index)}></FontAwesomeIcon>
                                        <label htmlFor={`item-${index + 1}`}>
                                            <input
                                                className="task-item"
                                                name="task"
                                                type="checkbox"
                                                id={`item-${index + 1}`}
                                                checked={currentTask.completed}
                                                onChange={() => { }}
                                            />
                                            <span className="label-text">{currentTask.name}</span>
                                        </label>
                                    </div>
                                    <span className='taskDates'>
                                        {currentTask.start_date && <span className="tag assigned">{formatStartDate(currentTask.start_date)}</span>}
                                        -
                                        {currentTask.end_date && <span className="tag deadline">{formatEndDate(currentTask.end_date)}</span>}
                                    </span>
                                    {currentTask.tag && (
                                        <>
                                            <div className="tagAndTrash">
                                                <span className={`tag ${currentTask.tag.toLowerCase().replace(' ', '-')}`}>
                                                    {currentTask.tag}
                                                </span>
                                                <span>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {expandedTask === index && (
                                    <>
                                        <div className="animateBottom task-description">
                                            <div className="taskDaysRemaining">
                                                <span className="days">
                                                    <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                                </span>
                                                <span className='isRemaining'>{calculateRemainingDays(currentTask.end_date)} Days left</span>
                                            </div>
                                            <p> {currentTask.description} </p>

                                        </div>
                                    </>
                                )}
                            </div>

                        ))
                    )}
                </div>

                <div className="header upcoming">Upcoming Tasks</div>
                <div className="task-wrapper w3-animate-bottom">
                    {upcomingTasks.length === 0 ? (
                        <div>No upcoming tasks</div>
                    ) : (
                        upcomingTasks.map((task, index) => (
                            <div className="animateBottom task" key={index}>
                                <div className="taskNameDrop">
                                    <FontAwesomeIcon className='.task-icon' icon={faCaretDown}></FontAwesomeIcon>
                                    <label htmlFor={`item-${index + 1}`}>
                                        <input
                                            className="task-item"
                                            name="task"
                                            type="checkbox"
                                            id={`item-${index + 1}`}
                                            checked={task.completed}
                                            onChange={() => { }}
                                        />
                                        <span className="label-text">{task.name}</span>
                                    </label>
                                </div>
                                <span className='taskDates'>
                                    {task.start_date && <span className="tag assigned">{formatStartDate(task.start_date)}</span>}
                                    -
                                    {task.end_date && <span className="tag deadline">{formatEndDate(task.end_date)}</span>}
                                </span>
                                {task.tag && (
                                    <>
                                        <div className="tagAndTrash">
                                            <span className={`tag ${task.tag.toLowerCase().replace(' ', '-')}`}>
                                                {task.tag}
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="header Completed">Completed Tasks</div>
                <div className="task-wrapper w3-animate-bottom">
                    {completedTasks.length === 0 ? (
                        <div>No completed tasks</div>
                    ) : (
                        completedTasks.map((task, index) => (
                            <div className="task animateBottom" key={index}>
                                <div className="taskNameDrop">
                                    <FontAwesomeIcon className='.task-icon' icon={faCaretDown}></FontAwesomeIcon>
                                    <label htmlFor={`item-${index + 1}`}>
                                        <input
                                            className="task-item"
                                            name="task"
                                            type="checkbox"
                                            id={`item-${index + 1}`}
                                            checked={task.completed}
                                            onChange={() => { }}
                                        />
                                        <span className="label-text">{task.name}</span>
                                    </label>
                                </div>
                                <span className='taskDates'>
                                    {task.start_date && <span className="tag assigned">{formatStartDate(task.start_date)}</span>}
                                    -
                                    {task.end_date && <span className="tag deadline">{formatEndDate(task.end_date)}</span>}
                                </span>
                                {task.tag && (
                                    <>
                                        <div className="tagAndTrash">
                                            <span className={`tag ${task.tag.toLowerCase().replace(' ', '-')}`}>
                                                {task.tag}
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="tasks-wrapper" style={{ display: visibleSection === 'Important' ? 'block' : 'none' }} id="Important">
                <KanbanBoard tasks={tasks} />
            </div>

            <div className="content-notes" style={{ display: visibleSection === 'Notes' ? 'block' : 'none' }} id="Notes">
                <p>Notes content</p>
            </div>

            <div className="content-links" style={{ display: visibleSection === 'Links' ? 'block' : 'none' }} id="Links">
                <p>Links content</p>
            </div>

            <button onClick={handleAddTaskClick} className='btn'>Add Task</button>

            {isTaskFormVisible && (
                <TaskForm
                    onClose={handleCloseTaskForm}
                    onAddTask={onAddTask}
                    currenttasks={currenttasks}
                    userId={userId}
                />
            )}
        </div>
    );
}
