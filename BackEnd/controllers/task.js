import { query } from '../db_Modules/db.js';

export const getAllTasks = async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters
  try {
    let sql = 'SELECT * FROM tasks';
    const params = [];

    if (userId) {
      sql += ' WHERE userId = ?';
      params.push(userId);
    }

    const result = await query(sql, params);
    console.log("Query Result:", result); // Log the raw result

    if (!result || !Array.isArray(result) || result.length === 0) {
      return res.status(404).json({ error: "No tasks found." });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Database Error:", err); // Log any errors
    res.status(500).json({ error: err.message });
  }
};

export const createTask = async (req, res) => {
  const { name, description, startDate, endDate, category, tag, userId } = req.body;

  if (!name || !description || !category || !tag || !userId) {
    return res.status(400).json({ error: "All fields except note and dates are required" });
  }

  try {
    const result = await query(
      'INSERT INTO tasks (name, description, start_date, end_date, category, tag, userId) VALUES (?, ?, ?, ?, ?, ?, ?) ORDER BY end_date',
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

// Function to update (mark as completed) a task
export const updateTask = async (req, res) => {
  const taskId = req.params.id; // Get taskId from request parameters
  const { completed } = req.body; // Get completed status from request body

  try {
    const result = await query(
      'UPDATE tasks SET completed = ? WHERE id = ?',
      [completed, taskId]
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

// Function to delete a task
// Function to "delete" a task by updating the 'deleted' column
export const deleteTask = async (req, res) => {
  const taskId = req.params.id; // Get taskId from request parameters

  try {
    const result = await query('UPDATE tasks SET deleted = 1 WHERE id = ?', [taskId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task marked as deleted successfully." });
  } catch (err) {
    console.error("Error marking task as deleted:", err);
    res.status(500).json({ error: err.message });
  }
};
