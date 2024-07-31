import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCaretDown, faDemocrat, faTrash, faBoltLightning, faChartBar, faClock, faTeletype, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import TaskForm from './TaskForm'; // Make sure TaskForm component is properly imported
import KanbanBoard from './KanbanBoard.jsx';
import UpdateTaskForm from './UpdateTaskForm';
import axios from 'axios';

export default function PageContent({ currenttasks, tasks, onAddTask, userId, selectedCategory }) {
    const [visibleSection, setVisibleSection] = useState('All1');
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expandedTask, setExpandedTask] = useState(null);
    const [expandedTask1, setExpandedTask1] = useState(null);
    const [expandedTask2, setExpandedTask2] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);


    const handleCompletionToggle = async (currentTask) => {
        try {
            const newCompletedStatus = !currentTask.completed; // Toggle the completion status
            await axios.put(`http://localhost:8081/api/tasks/toggle-completion/${currentTask.id}`, {
                completed: newCompletedStatus,
                userId: currentTask.userId // Pass the current user's ID
            });

            // Optionally, refresh the task list or update the local state
            //   setCurrentTask(prev => ({ ...prev, completed: newCompletedStatus }));
        } catch (error) {
            console.error('Error updating task completion:', error);
        }
    };
    const handleDeletionToggle = async (currentTask) => {
        try {
            const newDeleteStatus = !currentTask.deleted; // Toggle the completion status
            console.log("oh No, you tryna deleteme:\n taskid: ", currentTask.id, "\n taskname: ", currentTask.name, "\n Delete Status: ", currentTask.deleted ? 'Deleted' : 'Zinda hun abhi')
            await axios.put(`http://localhost:8081/api/tasks/toggle-deletion/${currentTask.id}`, {
                deleted: newDeleteStatus,
                userId: currentTask.userId // Pass the current user's ID
            });

            // Optionally, refresh the task list or update the local state
            //   setCurrentTask(prev => ({ ...prev, completed: newCompletedStatus }));
        } catch (error) {
            console.error('Error updating task Deletion:', error);
        }
    };

    const handleEditClick = (taskId) => {
        setCurrentTaskId(taskId);
        setShowUpdateForm(true);
    };

    const handleCloseUpdateForm = () => {
        setShowUpdateForm(false);
        setCurrentTaskId(null);
    };

    const handleUpdateTask = (updatedTask) => {
        // Handle the updated task (e.g., update the task list in state)
        console.log('Updated task:', updatedTask);
        setShowUpdateForm(false);
        setCurrentTaskId(null);
    };

    console.log(selectedCategory)
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
            return taskStartDate < today && taskEndDate > today && task.completed !== 1;
        } else if (task.completed !== 1) {
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
    const handleTaskToggle1 = (index) => {
        setExpandedTask1(expandedTask1 === index ? null : index); // Toggle the expanded task
    };
    const handleTaskToggle2 = (index) => {
        setExpandedTask2(expandedTask2 === index ? null : index); // Toggle the expanded task
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
                {selectedCategory === 'deleted' ? (
                    <>
                        <div className="headerIcon">
                            <FontAwesomeIcon icon={faArrowUp}/>
                            <FontAwesomeIcon icon={faArrowDown}/>
                        </div>
                        &nbsp; &nbsp;
                        <div className="headerName">Trash
                        </div>
                    </>
                ) : (
                    <>
                        <div className="headerIcon">
                            <FontAwesomeIcon icon={faArrowUp} onClick={handleArrowDownClick} />
                            <FontAwesomeIcon icon={faArrowDown} onClick={handleArrowUpClick} />
                        </div>
                        &nbsp; &nbsp;
                        <div className="headerName">Tasks for {isToday ? 'Today' : `${day}, ${date}${separator}${month < 10 ? "0" + month : month}${separator}${year}`}
                        </div>
                    </>
                )}
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
                        <div className='animateBottom'>No submissions for <b> {isToday ? 'today' : ` ${day}, ${date}${separator}${month < 10 ? "0" + month : month}${separator}${year}`}</b></div>
                    ) : (
                        filteredTasks.map((currentTask, index) => (
                            ((selectedCategory === "All" || currentTask.category === selectedCategory) && currentTask.deleted === 0) && (currentTask.completed === 0) && (
                                <div className="taskKaPapa" key={index}>
                                    <div className="task animateBottom">
                                        <div className="taskNameDrop">
                                            <FontAwesomeIcon className='.task-icon' icon={faCaretDown} onClick={() => handleTaskToggle(index)}></FontAwesomeIcon>
                                            <FontAwesomeIcon className='.task-icon' icon={faPenToSquare} onClick={() => handleEditClick(currentTask.id)}></FontAwesomeIcon>
                                            <label className='newFlex' htmlFor={`item-${index + 1}`}>
                                                <input
                                                    className="task-item"
                                                    name="task"
                                                    type="checkbox"
                                                    id={`item-${index + 1}`}
                                                    checked={currentTask.completed}
                                                    onChange={() => { handleCompletionToggle(currentTask) }}
                                                />
                                            </label>
                                            <span className="label-text nowRap">{currentTask.name}</span>
                                        </div>
                                        <span className='taskDates'>
                                            {currentTask.start_date && <span className="tag assigned">{formatStartDate(currentTask.start_date)}</span>}
                                            -
                                            {currentTask.end_date && <span className="tag deadline">{formatEndDate(currentTask.end_date)}</span>}
                                        </span>
                                        {currentTask.tag && (
                                            <div className="tagAndTrash">
                                                <span className={`tag ${currentTask.tag.toLowerCase().replace(' ', '-')}`}>
                                                    {currentTask.tag}
                                                </span>
                                                <span>
                                                    <FontAwesomeIcon icon={faTrash} onClick={() => { handleDeletionToggle(currentTask) }} />
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {expandedTask === index && (
                                        <div className="animateBottom task-description">
                                            <div className="taskDaysRemaining">
                                                <div>
                                                    <span className="days">
                                                        <FontAwesomeIcon icon={faTeletype}></FontAwesomeIcon>
                                                    </span>
                                                    <span className='isRemaining'>{currentTask.category}</span>
                                                </div>
                                                <div>
                                                    <span className="days">
                                                        <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                                    </span>
                                                    <span className='isRemaining'>{calculateRemainingDays(currentTask.end_date)} Days left</span>
                                                </div>
                                            </div>
                                            <p>{currentTask.description}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        ))
                    )}
                </div>

                <div className="header upcoming">Upcoming Tasks</div>
                <div className="task-wrapper w3-animate-bottom">
                    {upcomingTasks.length === 0 ? (
                        <div>No upcoming tasks</div>
                    ) : (
                        upcomingTasks.map((task, index) => (
                            <div className="taskKaPapa" key={index}>
                                <div className="animateBottom task" key={index}>
                                    <div className="taskNameDrop">
                                        <FontAwesomeIcon className='.task-icon' icon={faCaretDown} onClick={() => handleTaskToggle1(index)}></FontAwesomeIcon>
                                        <FontAwesomeIcon className='.task-icon' icon={faPenToSquare} onClick={() => handleEditClick(task.id)}></FontAwesomeIcon>
                                        <label htmlFor={`item-${index + 1}`}>
                                            <input
                                                className="task-item"
                                                name="task"
                                                type="checkbox"
                                                id={`item-${index + 1}`}
                                                checked={task.completed}
                                                onChange={() => { handleCompletionToggle(task) }}
                                            />
                                        </label>
                                        <span className="label-text nowRap">{task.name}</span>
                                    </div>
                                    <span className='taskDates'>
                                        {task.start_date && <span className="tag assigned">{formatStartDate(task.start_date)}</span>}
                                        -
                                        {task.end_date && <span className="tag deadline">{formatEndDate(task.end_date)}</span>}
                                    </span>
                                    {task.tag && (
                                        <div className="tagAndTrash">
                                            <span className={`tag ${task.tag.toLowerCase().replace(' ', '-')}`}>
                                                {task.tag}
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faTrash} onChange={() => { handleDeletionToggle(task) }} />
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {expandedTask1 === index && (
                                    <div className="animateBottom task-description">
                                        <div className="taskDaysRemaining">
                                            <div>
                                                <span className="days">
                                                    <FontAwesomeIcon icon={faTeletype}></FontAwesomeIcon>
                                                </span>
                                                <span className='isRemaining'>{task.category}</span>
                                            </div>
                                            <div>
                                                <span className="days">
                                                    <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                                </span>
                                                <span className='isRemaining'>{calculateRemainingDays(task.end_date)} Days left</span>
                                            </div>
                                        </div>
                                        <p>{task.description}</p>
                                    </div>
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
                            <div className="taskKaPapa" key={index}>
                                <div className="animateBottom task" key={index}>
                                    <div className="taskNameDrop">
                                        <FontAwesomeIcon className='.task-icon' icon={faCaretDown} onClick={() => handleTaskToggle2(index)}></FontAwesomeIcon>
                                        <FontAwesomeIcon className='.task-icon' icon={faPenToSquare} onClick={() => handleEditClick(task.id)}></FontAwesomeIcon>
                                        <label htmlFor={`item-${index + 1}`}>
                                            <input
                                                className="task-item"
                                                name="task"
                                                type="checkbox"
                                                id={`item-${index + 1}`}
                                                checked={task.completed}
                                                onChange={() => { handleCompletionToggle(task) }}
                                            />
                                        </label>
                                        <span className="label-text nowRap">{task.name}</span>
                                    </div>
                                    <span className='taskDates'>
                                        {task.start_date && <span className="tag assigned">{formatStartDate(task.start_date)}</span>}
                                        -
                                        {task.end_date && <span className="tag deadline">{formatEndDate(task.end_date)}</span>}
                                    </span>
                                    {task.tag && (
                                        <div className="tagAndTrash">
                                            <span className={`tag ${task.tag.toLowerCase().replace(' ', '-')}`}>
                                                {task.tag}
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faTrash} onChange={() => { handleDeletionToggle(task) }} />
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {expandedTask2 === index && (
                                    <div className="animateBottom task-description">
                                        <div className="taskDaysRemaining">
                                            <div>
                                                <span className="days">
                                                    <FontAwesomeIcon icon={faTeletype}></FontAwesomeIcon>
                                                </span>
                                                <span className='isRemaining'>{task.category}</span>
                                            </div>
                                            <div>
                                                <span className="days">
                                                    <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                                </span>
                                                <span className='isRemaining'>{calculateRemainingDays(task.end_date)} Days left</span>
                                            </div>
                                        </div>
                                        <p>{task.description}</p>
                                    </div>
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
            {showUpdateForm && currentTaskId && (
                <UpdateTaskForm
                    taskId={currentTaskId}
                    userId={userId}
                    onClose={handleCloseUpdateForm}
                    onUpdateTask={handleUpdateTask}
                />
            )}
        </div>
    );
}
