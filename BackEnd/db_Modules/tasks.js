const express = require('express');
const db = require('./db');

const router = express.Router();

// Fetch all tasks
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Insert a new task
router.post('/', (req, res) => {
    const { title, description, status, category } = req.body;
    const sql = 'INSERT INTO tasks (title, description, status, category) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, description, status, category], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Update a task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status, category } = req.body;
    const sql = 'UPDATE tasks SET title = ?, description = ?, status = ?, category = ? WHERE id = ?';
    db.query(sql, [title, description, status, category, id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

module.exports = router;
