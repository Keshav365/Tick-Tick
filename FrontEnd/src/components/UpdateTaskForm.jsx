import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/card.css';

export default function UpdateTaskForm({ taskId, onClose, onUpdateTask, userId }) {
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

  console.log('Updating task with ID:', taskId);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/tasks?id=${taskId}&userId=${userId}`);
        const fetchedTask = res.data;

        // Format the startDate and endDate if they are present
        setTask({
          ...fetchedTask,
          startDate: fetchedTask.start_date ? fetchedTask.start_date.split('T')[0] : '', // YYYY-MM-DD for input type="date"
          endDate: fetchedTask.end_date ? fetchedTask.end_date.slice(0, 16) : '', // YYYY-MM-DDTHH:MM for input type="datetime-local"
        });
        setNameLength(fetchedTask.name.length);
        setDescLength(fetchedTask.description.length);
      } catch (error) {
        console.log('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId, userId]);

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

    try {
      const res = await axios.put(`http://localhost:8081/api/tasks/${taskId}`, taskWithUserId);
      onUpdateTask(res.data);
      onClose();
    } catch (error) {
      console.log('Error updating task:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
      }
    }
  };

  return (
    <div className="loginDiv">
      <h3 className="text-whitesmoke">Update Task</h3>
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
                {console.log(task.startDate)}
                {console.log(task.endDate)}
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
          <button type="submit" className="form-button button-l margin-b">Update Task</button>
          <button type="button" className="form-button button-l margin-b" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
