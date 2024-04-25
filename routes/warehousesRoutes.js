import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router()
import knex from 'knex';
import knexfile from '../knexfile.js';
const db = knex(knexfile.development);

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const warehouseData = await db('warehouses')
            .where({id: id})
            .del();

        res.status(204).json("")
    }
    catch (err) {
        res.status(404).json({message: "No Warehouse Found!"})
    }
})

export default router;