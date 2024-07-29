// src/components/PageContent.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faDemocrat } from '@fortawesome/free-solid-svg-icons';
import TaskForm from './TaskForm'; // Make sure TaskForm component is properly imported

export default function PageContent({ tasks, onAddTask }) {
    const [visibleSection, setVisibleSection] = useState('All1');
    const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);

    const handleNavClick = (sectionId) => {
        setVisibleSection(sectionId);
    };

    const handleAddTaskClick = () => {
        setIsTaskFormVisible(true);
    };

    const handleCloseTaskForm = () => {
        setIsTaskFormVisible(false);
    };

    let newDate = new Date();
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

    return (
        <div className="page-content">
            <div className="header">
                <div className="headerName">Today Tasks</div>
                <div className="headerIcon">
                    <FontAwesomeIcon icon={faArrowUp} />&nbsp;<FontAwesomeIcon icon={faArrowDown} />
                </div>
            </div>

            <li className="item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    className="feather feather-calendar" viewBox="0 0 24 24">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <path d="M16 2v4M8 2v4m-5 4h18" />
                </svg>
                <span>{day}, {date}{separator}{month < 10 ? "0" + month : month}{separator}{year}</span>
            </li>

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
                    <label className="category" htmlFor="opt-2">Important</label>
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
                    <label className="category" htmlFor="opt-3">Notes</label>
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
                    {tasks.length === 0 ? (
                        <div>No tasks available</div>
                    ) : (
                        tasks.map((task, index) => (
                            <div className="task" key={index}>
                                <input
                                    className="task-item"
                                    name="task"
                                    type="checkbox"
                                    id={`item-${index + 1}`}
                                    checked={task.completed}
                                    onChange={() => { }}
                                />
                                <label htmlFor={`item-${index + 1}`}>
                                    <span className="label-text">{task.name}</span>
                                    &nbsp;
                                    {task.startDate && <span className="tag assigned">{task.startDate}</span>}
                                    &nbsp;
                                    {task.endDate && <span className="tag deadline">{task.endDate}</span>}
                                </label>
                                {task.status && (
                                    <span className={`tag ${task.status.toLowerCase().replace(' ', '-')}`}>
                                        {task.status}
                                    </span>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <div className="header upcoming">Upcoming Tasks</div>
                <div className="task-wrapper">
                    <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-7" onChange={() => { }} />
                        <label htmlFor="item-7">
                            <span className="label-text">Dashboard Design Implementation</span>
                        </label>
                        <span className="tag waiting">Waiting</span>
                    </div>
                    <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-8" onChange={() => { }} />
                        <label htmlFor="item-8">
                            <span className="label-text">Create a userflow</span>
                        </label>
                        <span className="tag waiting">Waiting</span>
                    </div>
                    <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-9" onChange={() => { }} />
                        <label htmlFor="item-9">
                            <span className="label-text">Application Implementation</span>
                        </label>
                        <span className="tag waiting">Waiting</span>
                    </div>
                    <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-10" onChange={() => { }} />
                        <label htmlFor="item-10">
                            <span className="label-text">Create a Dashboard Design</span>
                        </label>
                        <span className="tag waiting">Waiting</span>
                    </div>
                </div>

                <div className="header Completed">Completed Tasks</div>
                <div className="task-wrapper Over">
                    <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-7" onChange={() => { }} />
                        <label htmlFor="item-7">
                            <span className="label-text">Dashboard Design Implementation</span>
                        </label>
                        <span className="tag completed">Completed <FontAwesomeIcon icon={faDemocrat} /> </span>
                    </div>
                    <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-8" onChange={() => { }} />
                        <label htmlFor="item-8">
                            <span className="label-text">Create a userflow</span>
                        </label>
                        <span className="tag completed">Completed <FontAwesomeIcon icon={faDemocrat} /></span>
                    </div>
                    <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-9" onChange={() => { }} />
                        <label htmlFor="item-9">
                            <span className="label-text">Application Implementation</span>
                        </label>
                        <span className="tag completed">Completed <FontAwesomeIcon icon={faDemocrat} /></span>
                    </div>
                    <div className="task">
                        <input className="task-item" name="task" type="checkbox" id="item-10" onChange={() => { }} />
                        <label htmlFor="item-10">
                            <span className="label-text">Create a Dashboard Design</span>
                        </label>
                        <span className="tag completed">Completed <FontAwesomeIcon icon={faDemocrat} /></span>
                    </div>
                </div>
                
                <div className="addTask btn" onClick={handleAddTaskClick}>
                    Add a Task
                </div>
                {isTaskFormVisible && <TaskForm onClose={handleCloseTaskForm} onAddTask={onAddTask} />}
            </div>

            <div className="tasks-wrapper" style={{ display: visibleSection === 'Important' ? 'block' : 'none' }} id="Important">
                this is the Important tab
            </div>
            <div className="tasks-wrapper" style={{ display: visibleSection === 'Notes' ? 'block' : 'none' }} id="Notes">
                <iframe
                    src="https://drive.google.com/embeddedfolderview?id=1zoSkZXdGbdWPSiYaYiPbuNrB_q7qP4kt#grid"
                    width="100%" height="100%" frameBorder="0"></iframe>
            </div>
            <div className="tasks-wrapper" style={{ display: visibleSection === 'Links' ? 'block' : 'none' }} id="Links">
                <div className="header upcoming">CNS</div>
                <div className="task">
                    {/* Content for CNS */}
                </div>
                <div className="header upcoming">Linear Algebra</div>
                <div className="task">
                    {/* <iframe 
                        width="560" height="315"
                        src="https://www.youtube.com/embed/1XlT3Y2oyAU?list=PLU6SqdYcYsfI7Ebw_j-Vy8YKHdbHKP9am"
                        frameBorder="0" allowFullScreen></iframe> */}
                </div>
                <div className="header upcoming">Modeling & Simulation</div>
                <div className="header upcoming">Compiler Design</div>
                <div className="header upcoming">Data Mining</div>
            </div>
        </div>
    );
}


