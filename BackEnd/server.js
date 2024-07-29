const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const tasksRouter = require('./db_Modules/tasks');
const db = require('./db_Modules/db');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    return res.json("Backend YoYo");
});

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.use('/tasks', tasksRouter);

app.listen(8081, () => {
    console.log("Server running on port 8081");
});
