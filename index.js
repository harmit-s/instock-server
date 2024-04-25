import express from 'express';
import cors from 'cors';
import warehousesRouter from './routes/warehousesRoutes.js';
import inventoriesRouter from './routes/inventoriesRoutes.js';
import dotenv from 'dotenv';

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/warehouses', warehousesRouter);
app.use('/api/inventories', inventoriesRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));