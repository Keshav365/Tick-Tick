import { query } from '../db_Modules/db.js';


// Mark a link as deleted
export const toggleLinkDeletion = async (req, res) => {
    
    const linkId = req.params.id; // Get linkId from request parameters
    const { deleted, userId } = req.body; // Expect a boolean value for completed status and userId

    try {
        // Check if the link belongs to the user
        const linkCheck = await query('SELECT * FROM links WHERE id = ? AND userId = ?', [linkId, userId]);

        if (!linkCheck || linkCheck.length === 0) {
            return res.status(403).json({ error: "You do not have permission to modify this link." });
        }

        const result = await query(
            'UPDATE links SET deleted = ? WHERE id = ?',
            [deleted ? 1 : 0, linkId] // Set completed to 1 (true) or 0 (false)
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Link not found." });
        }

        res.status(200).json({ message: "Link deletion status updated successfully." });
    } catch (err) {
        console.error("Error updating link deletion status:", err);
        res.status(500).json({ error: err.message });
    }
};

// Create a new task
export const createLink = async (req, res) => {
    const { name, link, userId } = req.body;

    if (!name || !link || !userId) {
        return res.status(400).json({ error: "Name, link, and userId are required" });
    }

    try {
        const result = await query(
            'INSERT INTO links (name, link, userId, deleted) VALUES (?, ?, ?, 0)',
            [name, link, userId]
        );

        console.log("Insert Result:", result);

        if (result && result.insertId) {
            res.status(201).json({ id: result.insertId, name, link, userId, deleted: 0 });
        } else {
            res.status(400).json({ error: "Link creation failed" });
        }
    } catch (err) {
        console.error("Error creating link:", err);
        res.status(500).json({ error: err.message });
    }
};


// Get tasks by user id and optionally by task id
export const getLinks = async (req, res) => {
    const linkId = req.query.id; // Get linkId from request parameters
    const userId = req.query.userId; // Get userId from query parameters

    try {
        let sql = 'SELECT * FROM links WHERE deleted = 0';
        const params = [];

        if (linkId && userId) {
            sql += ' AND id = ? AND userId = ? order by Ctime';
            params.push(linkId, userId);
        } else if (userId) {
            sql += ' AND userId = ? ORDER BY Ctime DESC';
            params.push(userId);
        } else {
            return res.status(400).json({ error: "User ID is required." });
        }

        console.log(sql); // Log the SQL query
        const result = await query(sql, params);

        if (!result || !Array.isArray(result) || result.length === 0) {
            return res.status(404).json({ error: "No links found." });
        }

        res.status(200).json(result);
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: err.message });
    }
};

export const deleteLink = async (req, res) => {
    const { id, userId } = req.body;

    if (!id || !userId) {
        return res.status(400).json({ error: "Link ID and userId are required" });
    }

    try {
        const result = await query(
            'UPDATE links SET deleted = 1 WHERE id = ? AND userId = ?',
            [id, userId]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Link deleted successfully" });
        } else {
            res.status(404).json({ error: "Link not found or already deleted" });
        }
    } catch (err) {
        console.error("Error deleting link:", err);
        res.status(500).json({ error: err.message });
    }
};

