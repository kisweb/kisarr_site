import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// Create a new client
router.post("/", async (req, res) => {
    try {
        const {
            name,
            email,
            job,
            rate,
            isactive
        } = req.body;
        if (!name || !email || !job || !rate) {
            return res.status(400).json({ error: "All fields (name, email, job, rate) are required" });
        }
        const newClient = await pool.query(
            "INSERT INTO clients (name, email, job, rate, isactive) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, email, job, rate, isactive || false]
        );
        res.json(newClient.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get all clients
router.get("/", async (req, res) => {
    try {
        const allClients = await pool.query("SELECT * FROM clients");
        res.json(allClients.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update a client
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, job, rate, isactive } = req.body;
        if (!name || !email || !job || !rate) {
            return res.status(400).json({ error: "All fields (name, email, job, rate) are required" });
        }
        const updatedClient = await pool.query(
            "UPDATE clients SET name = $1, email = $2, job = $3, rate = $4, isactive = $5 WHERE id = $6 RETURNING *",
            [name, email, job, rate, isactive || false, id]
        );
        if (updatedClient.rows.length === 0) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.json({
            message: "Client was updated!",
            client: updatedClient.rows[0],
        });
        return res.status(400).json({ error: "Name, email, job, rate are required" });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a client
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClient = await pool.query(
            "DELETE FROM clients WHERE id = $1 RETURNING *",
            [id]
        );
        if (deletedClient.rows.length === 0) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.json("Client was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;