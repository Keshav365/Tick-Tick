// src/App.js
import React, { useState, useEffect, useContext } from 'react';
import LeftBar from './components/LeftBar';
import PageContent from './components/PageContent';
import RightBar from './components/RightBar';
import TaskForm from './components/TaskForm';
import { AuthContext } from './Context/AuthContext';

function Dashboard() {
  const [userData, setUserData] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    // Fetch tasks from backend or initialize with default data
    const initialTasks = [
      {
        name: "Dashboard Design Implementation",
        description: "Implement the design of the dashboard",
        category: "Design",
        tag: "UI",
        startDate: "27/07/2024",
        endDate: "29/07/2024",
        note: "This task is important",
        completed: true,
        status: "Approved",
      },
      {
        name: "Create a userflow",
        description: "Design the userflow for the application",
        category: "Design",
        tag: "UX",
        startDate: "",
        endDate: "",
        note: "",
        completed: true,
        status: "In Progress",
      },
      // Add more initial tasks as needed
    ];
    setTasks(initialTasks);
  }, []);

  return (
    <>
      <div>{currentUser && <p>Welcome, {currentUser.username} (ID: {currentUser.id})</p>}
      </div>
      <div className='task-manager0'></div>
      <div className='task-manager'>
        <LeftBar />
        <PageContent tasks={tasks} onAddTask={addTask} userId={currentUser?.id} />
        <RightBar UserData={userData} />
      </div>
    </>
  );
}

export default Dashboard;
