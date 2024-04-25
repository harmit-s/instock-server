import express from 'express';
const router = express.Router()
import knex from 'knex';
import knexfile from '../knexfile.js';
const db = knex(knexfile.development);

router.route('/')
  .get(async (req, res) => {
    try {
      const warehouseData = await db('warehouses')
      return res.status(200).json(warehouseData)
    } catch (err) {
      res.status(404).json({ message: "No Warehouses Found!" })
    }
  })

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {

    const warehouse = await db('warehouses').where({ id }).first();

    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });

    }

    res.json({
      id: warehouse.id,
      warehouse_name: warehouse.warehouse_name,
      address: warehouse.address,
      city: warehouse.city,
      country: warehouse.country,
      contact: {
        name: warehouse.contact_name,
        position: warehouse.contact_position,
        phone: warehouse.contact_phone,
        email: warehouse.contact_email
      }
    });
  } catch (error) {
    console.error(`Error fetching warehouse with ID ${id}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const warehouseData = await db('warehouses')
      .where({ id: id })
      .del();

    res.status(204).json("")
  }
  catch (err) {
    res.status(404).json({ message: "No Warehouse Found!" })
  }
})

export default router;