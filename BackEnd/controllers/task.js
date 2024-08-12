import { query } from '../db_Modules/db.js';

// Mark a task as completed or not
export const toggleTaskCompletion = async (req, res) => {
  const taskId = req.params.id; // Get taskId from request parameters
  const { completed, userId } = req.body; // Expect a boolean value for completed status and userId

  try {
    // Check if the task belongs to the user
    const taskCheck = await query('SELECT * FROM tasks WHERE id = ? AND userId = ?', [taskId, userId]);

    if (!taskCheck || taskCheck.length === 0) {
      return res.status(403).json({ error: "You do not have permission to modify this task." });
    }

    const result = await query(
      'UPDATE tasks SET completed = ? WHERE id = ?',
      [completed ? 1 : 0, taskId] // Set completed to 1 (true) or 0 (false)
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task completion status updated successfully." });
  } catch (err) {
    console.error("Error updating task completion status:", err);
    res.status(500).json({ error: err.message });
  }
};
// Mark a task as deleted
export const toggleTaskDeletion = async (req, res) => {
  const taskId = req.params.id; // Get taskId from request parameters
  const { deleted, userId } = req.body; // Expect a boolean value for completed status and userId

  try {
    // Check if the task belongs to the user
    const taskCheck = await query('SELECT * FROM tasks WHERE id = ? AND userId = ?', [taskId, userId]);

    if (!taskCheck || taskCheck.length === 0) {
      return res.status(403).json({ error: "You do not have permission to modify this task." });
    }

    const result = await query(
      'UPDATE tasks SET deleted = ? WHERE id = ?',
      [deleted ? 1 : 0, taskId] // Set completed to 1 (true) or 0 (false)
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task deletion status updated successfully." });
  } catch (err) {
    console.error("Error updating task deletion status:", err);
    res.status(500).json({ error: err.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  const { name, description, startDate, endDate, category, tag, userId } = req.body;

  if (!name || !description || !category || !tag || !userId) {
    return res.status(400).json({ error: "All fields except note and dates are required" });
  }

  try {
    const result = await query(
      'INSERT INTO tasks (name, description, start_date, end_date, category, tag, userId) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, startDate, endDate, category, tag, userId]
    );

    // Log the insertId to verify it
    console.log("Insert Result:", result);

    if (result && result.insertId) {
      res.status(201).json({ id: result.insertId, name, description, startDate, endDate, category, tag, userId });
    } else {
      res.status(400).json({ error: "Task creation failed" });
    }
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update an existing task
export const updateTask = async (req, res) => {
  const taskId = req.params.id; // Get taskId from request parameters
  const { name, description, startDate, endDate, category, tag, userId } = req.body;

  if (!name || !description || !category || !tag || !userId) {
    return res.status(400).json({ error: "All fields except note and dates are required" });
  }

  try {
    const result = await query(
      'UPDATE tasks SET name = ?, description = ?, start_date = ?, end_date = ?, category = ?, tag = ?, userId = ? WHERE id = ?',
      [name, description, startDate, endDate, category, tag, userId, taskId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task updated successfully." });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: err.message });
  }
};


// Get tasks by user id and optionally by task id
export const getTasks = async (req, res) => {
  const taskId = req.query.id; // Get taskId from request parameters
  const userId = req.query.userId; // Get userId from query parameters

  try {
    let sql = 'SELECT * FROM tasks';
    const params = [];

    // If both taskId and userId are provided, filter by both
    if (taskId && userId) {
      sql += ' WHERE id = ? AND userId = ?';
      params.push(taskId, userId);
    }
    // If only userId is provided, filter by userId
    else if (userId) {
      sql += ' WHERE userId = ?';
      params.push(userId);
    }
    // If no parameters are provided, you can return all tasks or handle it as you wish
    else {
      return res.status(400).json({ error: "User ID is required." });
    }

    console.log(sql); // Log the SQL query
    const result = await query(sql, params);

    if (!result || !Array.isArray(result) || result.length === 0) {
      return res.status(404).json({ error: "No tasks found." });
    }

    // If taskId is provided and matches, return the single task; otherwise return the array of tasks
    const response = taskId ? result[0] : result;
    res.status(200).json(response);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: err.message });
  }
};
