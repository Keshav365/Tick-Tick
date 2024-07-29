// controllers/task.js
import { db } from "../db_Modules/db.js";

export const getAllTasks = async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM tasks');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTask = async (req, res) => {
  const { name, description, startDate, endDate, category, tag, userId } = req.body;

  if (!name || !description || !category || !tag || !userId) {
    return res.status(400).json({ error: "All fields except note and dates are required" });
  }

  try {
    const result = await db.query(
      'INSERT INTO tasks (name, description, start_date, end_date, category, tag, userId) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, startDate, endDate, category, tag, userId]
    );

    // Log the insertId to verify it
    

    if (1) {
      res.status(201).json({ id: result.insertId, name, description, startDate, endDate, category, tag, userId });
    } else {
      res.status(400).json({ error: "Task creation failed" });
    }
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: err.message });
  }
};
