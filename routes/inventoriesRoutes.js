import express from 'express';
import knex from 'knex';
import knexfile from '../knexfile.js';

const router = express.Router()
const db = knex(knexfile.development);

router.route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        try {
            const itemData = await db('inventories')
                .where({ "inventories.id": id })
                .join('warehouses', 'warehouses.id', 'inventories.warehouse_id')
            if (itemData.length === 0) {
                return res.status(404).json({ message: `Item with id${id} not found` });
            } else {
                const items = itemData.map(item => {
                    return {
                        id: item.id,
                        warehouse_name: item.warehouse_name,
                        item_name: item.item_name,
                        description: item.description,
                        category: item.category,
                        status: item.status,
                        quantity: item.quantity
                    }
                })
                return res.status(200).json(items[0])
            }
        } catch (err) {
            res.status(404).json({ message: err })
        }
    })

router.route('/')
    .get(async (req, res) => {
        try {
            const itemData = await db('inventories')
                .join('warehouses', 'warehouses.id', 'inventories.warehouse_id');
            const items = itemData.map(item => {
                return {
                    id: item.id,
                    warehouse_name: item.warehouse_name,
                    item_name: item.item_name,
                    description: item.description,
                    category: item.category,
                    status: item.status,
                    quantity: item.quantity
                }
            })
            return res.status(200).json(items)
        } catch (err) {
            res.status(404).json({ message: "No Inventory" })
        }
    })

    router.delete("/:id", async (req, res) => {
        const id = req.params.id
        try {
            const itemData = await db('inventories')
                .where({ id: id })
                .del();
    
            if (itemData === 0) {
                res.status(404).json({ message: "No Inventory Item Found!" });
            } else {
                res.status(204).json("");
            }
        }
        catch (err) {
            res.status(404).json({ message: "No Inventory Item Found!" })
        }
    })


router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const {
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity
    } = req.body;
  
    try {
      const itemsData = await db('inventories')
        .where({ 'inventories.id': id })
        .join('warehouses', 'warehouses.id', 'inventories.warehouse_id')
        .first();
  
      if (!itemsData) {
        return res.status(404).json({ message: `inventory item with id ${id} not found` });
      }
  
      const warehouseExists = await db('warehouses').where({ 'id':id });
      if (!warehouseExists) {
        return res.status(400).json({ message: `warehouse with id ${id} does not exist` });
      }
  
      const updatedFields = {};
      if (item_name) updatedFields.item_name = item_name;
      if (description) updatedFields.description = description;
      if (category) updatedFields.category = category;
      if (status) updatedFields.status = status;
      if (!isNaN(quantity)) updatedFields.quantity = Number(quantity);
  
      
      if (updatedFields.quantity && isNaN(updatedFields.quantity)) {
        return res.status(400).json({ message: 'quantity must be a valid number' });
      }
  
      await db('inventories')
        .where({ id })
        .update(updatedFields);
  
      const updatedItem = await db('inventories').where({ id }).first();
  
      return res.status(200).json(updatedItem);
    } catch (error) {
      console.error('error updating inventory item:', error);
      return res.status(500).json({ message: 'error' });
    }
  });

export default router;