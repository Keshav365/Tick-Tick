import mysql from 'mysql';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

export const db = mysql.createConnection({
    host: 'sicktickazure.mysql.database.azure.com',
    user: 'shivamAzure',
    password: 'Keshavkutti1',
    database: 'sicktick',
    ssl: {
        // rejectUnauthorized: false,
        // ca: fs.readFileSync('BaltimoreCyberTrustRoot.crt.pem', 'utf8') // Ensure the path is correct
    }
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Utility function to query the database
export const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};
