import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LeftBar from './components/LeftBar';
import PageContainer from './components/PageContainer';
import RightBar from './components/RightBar';
import TaskForm from './components/TaskForm';
import { AuthContext } from './Context/AuthContext';

function Dashboard() {
  const [userData, setUserData] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/tasks?userId=${currentUser?.id}`);
      const fetchedTasks = response.data;

      // Parsing dates and categorizing tasks
      const now = new Date();
      const current = fetchedTasks.filter(task => new Date(task.end_date) > now && task.completed !== 1);
      const upcoming = fetchedTasks.filter(task => new Date(task.start_date) > now);
      const completed = fetchedTasks.filter(task => task.completed === 1);

      // Sort tasks by end_date
      const sortByEndDate = (a, b) => new Date(a.end_date) - new Date(b.end_date);
      current.sort(sortByEndDate);
      upcoming.sort(sortByEndDate);
      completed.sort(sortByEndDate);

      setTasks(fetchedTasks);
      setCurrentTasks(current);
      setUpcomingTasks(upcoming);
      setCompletedTasks(completed);
      console.log(currentTasks)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {


    // const interval = setInterval(() => {
      if (currentUser) {
        console.log("have current user", currentUser)
        fetchTasks();
      }
    // }, 100);



  }, [currentUser]);

  return (
    <>
      <div className='task-manager0'></div>
      <div className='task-manager'>
        {currentUser.id}
        <PageContainer
          tasks={tasks}
          currentTasks={currentTasks}
          upcomingTasks={upcomingTasks}
          completedTasks={completedTasks}
          onAddTask={addTask}
          userId={currentUser?.id}
        />
        <RightBar UserData={userData} tasks={tasks} currentTasks={currentTasks} />
      </div>
    </>
  );
}


export default Dashboard;
