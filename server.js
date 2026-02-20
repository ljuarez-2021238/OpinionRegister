import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './src/Config/database.js';
import authRoutes from './src/Routes/auth.routes.js';

dotenv.config();

const app = express();

connectDB();


app.use(express.json());

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.json({ message: "Opinion Management System Running " });
});


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});