import React, { useState, useEffect } from 'react';
import LeftBar from './LeftBar'; // Adjust the import path as necessary
import PageContent from './PageContent'; // Adjust the import path as necessary

export default function PageContainer({ currenttasks, logoutFunc, tasks, onAddTask, userId, fetchTasks, fetchLink, links}) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDate, setSelectedDate] = useState(new Date());
    // const [tasks, setTasks] = useState([]); // Initialize with empty array or fetch from your data source
    // console.log("hahahahhah", selectedDate)
    useEffect(() => {
        // Fetch tasks from your data source and set them
        // Example: setTasks(fetchedTasks);
    }, []);

    const handleCategoryChange = (category) => {
        // console.log(category)
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
            <LeftBar onCategoryChange={handleCategoryChange} logoutFunc={logoutFunc} onDateChange={handleDateChange} />
            <PageContent
                fetchTasks={fetchTasks}
                currenttasks={currenttasks}
                tasks={tasks}
                onAddTask={onAddTask}
                userId={userId} // Replace with actual userId
                selectedCategory={selectedCategory}
                selectedDateFromLD={selectedDate}
                fetchLink={fetchLink}
                links={links}
                onDateChange={handleDateChange} // Pass down date change handler
            />
        </>
    );
}
