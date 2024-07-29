// src/components/TaskForm.jsx
import React, { useState } from 'react';
import './CSS/card.css'

export default function TaskForm({ onClose, onAddTask }) {
  const [task, setTask] = useState({
    name: '',
    description: '',
    category: '',
    tag: '',
    startDate: '',
    endDate: '',
    note: '',
    status: 'assigned'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(task);
    onClose();
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
              />
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
              />
            </div>
          </div>
          <div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="category"
                onChange={handleChange}
                value={task.category}
                placeholder="Category"
                required
              />
            </div>
            <div className="form-group">
              <select
                name="status"
                className="form-control"
                onChange={handleChange}
                value={task.status}
                required
              >
                <option value="assigned">Assigned</option>
                <option value="deadline">Deadline</option>
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
                type="date"
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
