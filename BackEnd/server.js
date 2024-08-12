import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

import authRoutes from './routes/auths.js';
import taskRoutes from './routes/tasks.js';
import linkRoutes from './routes/links.js';

// Middleware to parse JSON bodies
app.use(express.json());

// CORS options to allow all origins
const corsOptions = {
    origin: '*', // Allow all origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Define the /rand route
app.get('/rand', (req, res) => {
    res.send("hello ji");
});

// Set up your other routes
app.use('/auths', authRoutes); 
app.use('/api/tasks', taskRoutes);
app.use('/api/links', linkRoutes);

const PORT = process.env.PORT || 8080; // Use environment variable PORT or fallback to 8080

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
