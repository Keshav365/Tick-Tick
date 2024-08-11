import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LeftBar from './components/LeftBar';
import PageContainer from './components/PageContainer';
import RightBar from './components/RightBar';
import { AuthContext } from './Context/AuthContext';

function Dashboard() {
  const [userData, setUserData] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const { currentUser, logout } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/tasks?userId=${currentUser?.id}`);
      const fetchedTasks = response.data;
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
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  const fetchLink = async () => {
    
    try {
      const response = await axios.get(`http://localhost:8081/api/links?userId=4`);
      console.log('Links Response:', response.data);
      const fetchedLinks = response.data;
      setLinks(fetchedLinks);
    } catch (error) {
      console.error('Error fetching tasks or links:', error);
    }
  };
  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect to login if no currentUser
    } else {
      fetchTasks();
      fetchLink()
    }
  }, [currentUser, navigate]);

  return (
    <>
      {/* <button onClick={logout} className='btn'>Add Task</button> */}
      {/* <button className='Logout' onClick={logout}>Logout</button> */}

      <div className='task-manager'>
        {/* {currentUser.id} */}
        <PageContainer
          tasks={tasks}
          currentTasks={currentTasks}
          upcomingTasks={upcomingTasks}
          completedTasks={completedTasks}
          onAddTask={addTask}
          userId={currentUser?.id}
          logoutFunc={logout}
          fetchTasks={fetchTasks}
          fetchLink={fetchLink}
          links={links}
        />
        <RightBar logoutFunc={logout} UserData={userData} tasks={tasks} currentTasks={currentTasks} />
      </div>
    </>
  );
}

export default Dashboard;
