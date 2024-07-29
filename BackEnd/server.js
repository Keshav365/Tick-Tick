import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express();
import authRoutes from './routes/auths.js';
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';

// Middleware to parse JSON bodies
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173', // Allow your frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(8081, () => {
    console.log("Server running on port 8081");
});
