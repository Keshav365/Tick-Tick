import React, { useState, useEffect } from 'react';
import LeftBar from './LeftBar'; // Adjust the import path as necessary
import PageContent from './PageContent'; // Adjust the import path as necessary

export default function PageContainer({ currenttasks, tasks, onAddTask, userId }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDate, setSelectedDate] = useState(new Date());
    // const [tasks, setTasks] = useState([]); // Initialize with empty array or fetch from your data source

    useEffect(() => {
        // Fetch tasks from your data source and set them
        // Example: setTasks(fetchedTasks);
    }, []);

    const handleCategoryChange = (category) => {
        console.log(category)
        setSelectedCategory(category);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleAddTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return (
        <>
            <LeftBar onCategoryChange={handleCategoryChange} onDateChange={handleDateChange} />
            <PageContent
                currenttasks={currenttasks}
                tasks={tasks}
                onAddTask={onAddTask}
                userId={userId} // Replace with actual userId
                selectedCategory={selectedCategory}
                selectedDate={selectedDate}
                onDateChange={handleDateChange} // Pass down date change handler
            />
        </>
    );
}
