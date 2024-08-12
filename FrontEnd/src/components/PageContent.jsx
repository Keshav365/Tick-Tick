import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCaretDown, faDemocrat, faTrash, faBoltLightning, faChartBar, faClock, faTeletype, faAddressCard, faBiking, faSkiing, faTasks, faPenToSquare, faRefresh, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import TaskForm from './TaskForm'; // Make sure TaskForm component is properly imported
import LinkForm from './LinkForm'; // Make sure TaskForm component is properly imported
import KanbanBoard from './KanbanBoard.jsx';
import UpdateTaskForm from './UpdateTaskForm';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext.jsx';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function PageContent({ currenttasks, selectedDateFromLD, tasks, onAddTask, userId, selectedCategory, fetchTasks, fetchLink, links }) {
    const [visibleSection, setVisibleSection] = useState('All1');
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
    const [isLinkFormVisible, setIsLinkFormVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expandedTask, setExpandedTask] = useState(null);
    const [expandedTask1, setExpandedTask1] = useState(null);
    const [expandedTask2, setExpandedTask2] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [currentButton, setCurrentButton] = useState(null);
    const { currentUser, logout } = useContext(AuthContext);
    const getIcon = (iconType) => {
        switch (iconType) {
            case 'Work':
                return faAddressCard;
            case 'General':
                return faBiking;
            case 'Personel':
                return faSkiing;
            default:
                return faTasks; // Default icon
        }

    };






    //  selectedDateFromLD = undefined;
    useEffect(() => {

        setSelectedDate(selectedDateFromLD)

    }, [selectedDateFromLD]);
    const handleCompletionToggle = async (currentTask) => {

        try {
            const newCompletedStatus = !currentTask.completed; // Toggle the completion status
            await axios.put(`http://localhost:8081/api/tasks/toggle-completion/${currentTask.id}`, {
                completed: newCompletedStatus,
                userId: currentTask.userId // Pass the current user's ID
            });
            fetchTasks();
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
            fetchTasks()


            // Optionally, refresh the task list or update the local state
            //   setCurrentTask(prev => ({ ...prev, completed: newCompletedStatus }));
        } catch (error) {
            console.error('Error updating task Deletion:', error);
        }
    };
    const handleLinkDeletionToggle = (link) => {
        handleLinkDeletionToggle1(link);
    };

    const handleLinkDeletionToggle1 = async (link) => {
        try {
            const newDeleteStatus = !link.deleted; // Toggle the deletion status
            console.log("oh No, you tryna delete me:\n link id: ", link.id, "\n link name: ", link.name, "\n Delete Status: ", link.deleted ? 'Deleted' : 'Zinda hun abhi');

            // Update the deletion status in the backend
            await axios.put(`http://localhost:8081/api/links/toggle-deletion/${link.id}`, {
                deleted: newDeleteStatus,
                userId: link.userId // Pass the current user's ID
            });

            // Fetch the updated list of links after successful deletion toggle
            fetchLink();
        } catch (error) {
            console.error('Error updating link deletion:', error);
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
        // console.log('Updated task:', updatedTask);
        setShowUpdateForm(false);
        setCurrentTaskId(null);
    };

    // console.log(selectedCategory)
    const handleNavClick = (sectionId) => {

        setCurrentButton(sectionId);
        console.log(sectionId);
        setVisibleSection(sectionId);
    };

    const handleAddTaskClick = () => {

        setIsTaskFormVisible(true);
    };

    const handleCloseTaskForm = () => {

        setIsTaskFormVisible(false);
    };
    const handleAddLinkClick = () => {
        fetchLink()
        setIsLinkFormVisible(true);
    };

    const handleCloseLinkForm = () => {
        setIsLinkFormVisible(false);
    };

    const handleArrowUpClick = () => {

        setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
        console.log(selectedDate)
        console.log(selectedDateFromLD)
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
            return taskStartDate < taskEndDate && task.completed !== 1;
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
        const year = (date.getFullYear()).toString().substr(2).padStart(2, '0');
        return `${day}/${month}/${year}`;
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
    const formatEndDate2 = (dateString) => {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const hours1 = date.getHours() % 12 || 12;
        const hours = hours1.toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        const year = (date.getFullYear()).toString().substr(2).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };

    const timeRem = (task) => {
        const remainingDays = calculateRemainingDays(task.end_date);

        if (remainingDays === 1) {
            return (
                <> {remainingDays} Day left </>
            );
        } else {
            return (
                <> {remainingDays} Days left </>
            );
        }
    };

    return (
        <div className="page-content">
            <div className="header">
                {selectedCategory === 'deleted' ? (
                    <>
                        {/* <div className="headerIcon">
                            <FontAwesomeIcon icon={faArrowUp} />
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div> */}
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
                    <label className="category" htmlFor="opt-4">Youtube Playlists</label>
                </div>
            </div>

            {selectedCategory === 'deleted' ? (
                <>
                    <div className="tasks-wrapper" style={{ display: visibleSection === 'All1' ? 'block' : 'none' }} id="All1">
                        <div className="task-wrapper long w3-animate-bottom">
                            {tasks.length === 0 ? (
                                <div>Nothing to see here</div>
                            ) : (
                                tasks.map((task, index) => (

                                    <div className="taskKaPapa" key={index}>
                                        {
                                            task.deleted === 1 ? (
                                                <>
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
                                                            &nbsp;
                                                            {task.end_date && <span className="tag deadline fullEndDate"> - {formatEndDate(task.end_date)}</span>}
                                                            {task.end_date && <span className="tag deadline endDate"> - {formatEndDate2(task.end_date)}</span>}
                                                        </span>
                                                        {task.tag && (
                                                            <div className="tagAndTrash">
                                                                <span className={`tag fullTag ${task.tag.toLowerCase().replace(' ', '-')}`}>
                                                                    {task.tag}
                                                                </span>
                                                                <span className={`tag sliceTag ${task.tag.toLowerCase().replace(' ', '-')}`}>
                                                                    {task.tag.slice(0, 1)}
                                                                </span>
                                                                &nbsp;
                                                                <span>
                                                                    <FontAwesomeIcon icon={faRefresh} onClick={() => { handleDeletionToggle(task) }} />
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {expandedTask1 === index && (
                                                        <div className="animateBottom task-description">
                                                            <div className="taskDaysRemaining">
                                                                <div>
                                                                    <span className="days">
                                                                        <FontAwesomeIcon icon={getIcon(task.category)}></FontAwesomeIcon>
                                                                    </span>
                                                                    <span className='isRemaining'>{task.category}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="days">
                                                                        <FontAwesomeIcon icon={faClock}>

                                                                        </FontAwesomeIcon>
                                                                    </span>
                                                                    <span className='isRemaining'>{timeRem(task)} </span>
                                                                </div>
                                                            </div>
                                                            <p>{task.description}</p>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {/* <div>Nothing to see here</div> */}
                                                </>
                                            )
                                        }





                                    </div>

                                ))
                            )}
                        </div>
                    </div>
                </>) : (
                <>
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
                                                    {currentTask.start_date && <span className="tag assigned">{formatStartDate(currentTask.start_date)} </span>}
                                                    &nbsp;
                                                    {currentTask.end_date && <span className="tag deadline fullEndDate"> - {formatEndDate(currentTask.end_date)}</span>}
                                                    {currentTask.end_date && <span className="tag deadline endDate"> - {formatEndDate2(currentTask.end_date)}</span>}
                                                </span>
                                                {currentTask.tag && (
                                                    <div className="tagAndTrash">
                                                        <span className={`tag fullTag ${currentTask.tag.toLowerCase().replace(' ', '-')}`}>
                                                            {currentTask.tag}
                                                        </span>
                                                        <span className={`tag sliceTag ${currentTask.tag.toLowerCase().replace(' ', '-')}`}>
                                                            {currentTask.tag.slice(0, 1)}
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
                                                                <FontAwesomeIcon icon={getIcon(currentTask.category)}></FontAwesomeIcon>
                                                            </span>
                                                            <span className='isRemaining'>{currentTask.category}</span>
                                                        </div>
                                                        <div>
                                                            <span className="days">
                                                                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                                            </span>
                                                            <span className='isRemaining'>{timeRem(currentTask)}</span>
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
                                    ((selectedCategory === "All" || task.category === selectedCategory) && task.deleted === 0) && (task.completed === 0) && (
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
                                                    &nbsp;
                                                    {task.end_date && <span className="tag deadline fullEndDate"> - {formatEndDate(task.end_date)}</span>}
                                                    {task.end_date && <span className="tag deadline endDate"> - {formatEndDate2(task.end_date)}</span>}
                                                </span>
                                                {task.tag && (
                                                    <div className="tagAndTrash">
                                                        <span className={`tag fullTag ${task.tag.toLowerCase().replace(' ', '-')}`}>
                                                            {task.tag}
                                                        </span>
                                                        <span className={`tag sliceTag ${task.tag.toLowerCase().replace(' ', '-')}`}>
                                                            {task.tag.slice(0, 1)}
                                                        </span>
                                                        <span>
                                                            <FontAwesomeIcon icon={faTrash} onClick={() => { handleDeletionToggle(task) }} />
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            {expandedTask1 === index && (
                                                <div className="animateBottom task-description">
                                                    <div className="taskDaysRemaining">
                                                        <div>
                                                            <span className="days">
                                                                <FontAwesomeIcon icon={getIcon(task.category)}></FontAwesomeIcon>
                                                            </span>
                                                            <span className='isRemaining'>{task.category}</span>
                                                        </div>
                                                        <div>
                                                            <span className="days">
                                                                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                                            </span>
                                                            <span className='isRemaining'>{timeRem(task)}</span>
                                                        </div>
                                                    </div>
                                                    <p>{task.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    )
                                ))
                            )}
                        </div>

                        <div className="header Completed">Completed Tasks</div>
                        <div className="task-wrapper w3-animate-bottom">
                            {completedTasks.length === 0 ? (
                                <div>No completed tasks</div>
                            ) : (
                                completedTasks.map((task, index) => (
                                    ((selectedCategory === "All" || task.category === selectedCategory) && task.deleted === 0) && (task.completed === 1) && (
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
                                                    &nbsp;
                                                    {task.end_date && <span className="tag deadline fullEndDate"> - {formatEndDate(task.end_date)}</span>}
                                                    {task.end_date && <span className="tag deadline endDate"> - {formatEndDate2(task.end_date)}</span>}
                                                </span>
                                                {task.tag && (
                                                    <div className="tagAndTrash">
                                                        <span className={`tag fullTag ${task.tag.toLowerCase().replace(' ', '-')}`}>
                                                            {task.tag}
                                                        </span>
                                                        <span className={`tag sliceTag ${task.tag.toLowerCase().replace(' ', '-')}`}>
                                                            {task.tag.slice(0, 1)}
                                                        </span>
                                                        <span>
                                                            <FontAwesomeIcon icon={faTrash} onClick={() => { handleDeletionToggle(task) }} />
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            {expandedTask2 === index && (
                                                <div className="animateBottom task-description">
                                                    <div className="taskDaysRemaining">
                                                        <div>
                                                            <span className="days">
                                                                <FontAwesomeIcon icon={getIcon(task.category)}></FontAwesomeIcon>
                                                            </span>
                                                            <span className='isRemaining'>{task.category}</span>
                                                        </div>
                                                        <div>
                                                            <span className="days">
                                                                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                                            </span>
                                                            <span className='isRemaining'>
                                                                {timeRem(task)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p>{task.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    )
                                )
                                )
                            )}
                        </div>
                    </div>
                </>
            )}
            <div className="tasks-wrapper" style={{ display: visibleSection === 'Important' ? 'block' : 'none' }} id="Important">
                <KanbanBoard tasks={tasks} />
            </div>

            <div className="tasks-wrapper" style={{ display: visibleSection === 'Notes' ? 'block' : 'none' }} id="Notes">
                <div className="Drive">
                    <iframe
                        className='bg-light'
                        src="https://drivecpauthtest.web.app/" // Replace this with the URL you want to embed
                        title="Embedded Website"
                        style={{ width: '100%', height: '101%', border: 'none' }}
                    ></iframe>
                </div>
            </div>

            <div className="content-links tasks-wrapper" style={{ display: visibleSection === 'Links' ? 'block' : 'none' }} id="Links">
                {links === 0 ? (
                    <div>Nothing to see here</div>
                ) :
                    links.map((link, index) => (
                        <>
                            <div className="linkHeader">

                                <div key={index} className="linkNam">{link.name} </div>
                                <span>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => { handleLinkDeletionToggle(link) }} />
                                </span>
                            </div>
                            <div className='uPort'>
                                <iframe width="560" height="315"
                                    src={link.link}
                                    frameBorder="0" allowFullScreen></iframe>

                            </div>
                        </>
                    ))}
            </div>

            <button onClick={currentButton == 'Links' ? handleAddLinkClick : handleAddTaskClick} className='btn'>Add  {currentButton == 'Links' ? `Playlist` : `Task`}  </button>
            <button onClick={logout} className='pwrBtn'><FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon> </button>

            {
                isLinkFormVisible && (
                    <LinkForm
                        onClose={handleCloseLinkForm}
                        onAddTask={onAddTask}
                        currenttasks={currenttasks}
                        userId={userId}
                        fetchLink={fetchLink}
                    />
                )
            }
            {
                isTaskFormVisible && (
                    <TaskForm
                        onClose={handleCloseTaskForm}
                        onAddTask={onAddTask}
                        currenttasks={currenttasks}
                        userId={userId}
                        fetchTasks={fetchTasks}
                    />
                )
            }
            {
                showUpdateForm && currentTaskId && (
                    <UpdateTaskForm
                        taskId={currentTaskId}
                        userId={userId}
                        onClose={handleCloseUpdateForm}
                        onUpdateTask={handleUpdateTask}
                        fetchTasks={fetchTasks}
                    />
                )
            }
        </div >
    );
}
