import express from 'express';
import knex from 'knex';
import knexConfig from '../knexfile.js'; 
const myknex = knex(knexConfig); 
import cors from 'cors';

const router = express.Router();


router.use(cors());
router.use(express.json());


router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      
      const warehouse = await myknex.select('warehouses').where({ id }).first();
      
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


export default router;