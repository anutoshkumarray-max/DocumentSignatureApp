import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js'; // <-- 1. Imported your Day 3 routes

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mounting Core Application Pipelines
app.use('/api/auth', authRoutes);
app.use('/api/docs', documentRoutes); // <-- 2. Mounted Day 3 document channels right here

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
    res.send('DocSigner API is running smoothly...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server blasting off on port ${PORT}`);
});