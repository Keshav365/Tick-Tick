import React, { useState } from 'react';
import axios from 'axios';
import './CSS/card.css';

export default function TaskForm({ onClose, onAddTask, userId, fetchTasks}) {
  const [nameLength, setNameLength] = useState(0);
  const [descLength, setDescLength] = useState(0);
  const [task, setTask] = useState({
    name: '',
    description: '',
    category: '',
    tag: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });

    if (name === 'name') {
      setNameLength(value.length);
    }
    if (name === 'description') {
      setDescLength(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskWithUserId = { ...task, userId };

    // Log the task object before sending it
    console.log('Task object being sent:', taskWithUserId);

    try {
      const res = await axios.post('http://localhost:8081/api/tasks', taskWithUserId);
      console.log('Response from server:', res.data);
      onAddTask(res.data); // Use the data returned from the server
      onClose();
      fetchTasks(); 
    }catch (error) {
      console.log('Error adding task:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request data:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
    }
  };

  return (
    <div className="loginDiv">
      <h3 className="text-whitesmoke">Add New Task</h3>
      <div className="container-content">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                placeholder="Title"
                value={task.name}
                required
                maxLength={1000}
              />
              <small>{nameLength}/1000</small>
            </div>
          </div>
          <div>
            <div className="form-group">
              <textarea
                className="form-control"
                name="description"
                onChange={handleChange}
                placeholder="Description"
                value={task.description}
                required
                maxLength={3000}
              />
              <small>{descLength}/3000</small>
            </div>
          </div>
          <div>
            <div className="form-group">
              <select
                name="category"
                className="form-control"
                onChange={handleChange}
                value={task.category}
                required
              >
                <option value="">Select Category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="General">General</option>
                <option value="Festival">Festival</option>
                <option value="Concerts">Concerts</option>
              </select>
            </div>
            <div className="form-group">
              <select
                name="tag"
                className="form-control"
                onChange={handleChange}
                value={task.tag}
                required
              >
                <option value="">Select Status</option>
                <option value="assigned">Assigned</option>
                <option value="approved">Approved</option>
                <option value="progress">In Progress</option>
                <option value="review">In Review</option>
                <option value="waiting">Waiting</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                name="startDate"
                onChange={handleChange}
                value={task.startDate}
              />
            </div>
            <div className="form-group">
              <input
                type="datetime-local"
                className="form-control"
                name="endDate"
                onChange={handleChange}
                value={task.endDate}
              />
            </div>
          </div>
          <button type="submit" className="form-button button-l margin-b">Add Task</button>
          <button type="button" className="form-button button-l margin-b" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
