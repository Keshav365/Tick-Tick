import React from 'react';
import './CSS/KanbanBoard.scss'; // Add your styles for the Kanban board

export default function KanbanBoard({ tasks }) {
    // Group tasks by their tags
    const groupedTasks = tasks.reduce((acc, task) => {
        if (!acc[task.tag]) {
            acc[task.tag] = [];
        }
        acc[task.tag].push(task);
        return acc;
    }, {});
    
    const firtToUpper = (name) => {
        let first = name.substr(0, 1);
        first = first.toUpperCase();
        let allButLast = name.substr(1);

        return (first + allButLast);
    };

    const formatStartDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}/${date.getFullYear()}`;
    };

    // Function to format end_date
    const formatEndDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${day}/${month}, ${hours}:${minutes} ${ampm}`;
    };

    // Function to calculate remaining days until the end date
    const calculateRemainingDays = (endDate) => {
        const today = new Date();
        const end = new Date(endDate);
        const timeDiff = end - today; // Difference in milliseconds
        const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
        return remainingDays <= 0 ? 0 : remainingDays; // Return 0 if the date has passed
    };

    return (
        <div className="kanban-board">
            <div className="kanbarboardDiv">
                {Object.keys(groupedTasks).map(tag => (
                    <div key={tag} className={`kanban-column ${tag.toLowerCase().replace(' ', '-')}`}>
                        <h3>{firtToUpper(tag)}</h3>
                        {groupedTasks[tag].length === 0 ? (
                            <p>No tasks</p>
                        ) : (
                            groupedTasks[tag].map((task, index) => (
                                <div key={index} className={`kanban-task`}>
                                    <h4>{task.name}</h4>
                                    <p>{task.description}</p>
                                    <span>{formatStartDate(task.start_date)} - {formatEndDate(task.end_date)}</span>
                                    <p>Remaining Days: {calculateRemainingDays(task.end_date)}</p>
                                    {/* You can add more task details here */}
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
