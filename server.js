import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './src/Config/database.js';
import authRoutes from './src/Routes/auth.routes.js';
import publicacionRoutes from './src/Routes/publication.routes.js';
import comentarioRoutes from './src/Routes/comentario.routes.js'; // <-- importamos rutas de comentarios

dotenv.config();

const app = express();


connectDB();


app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/publicaciones', publicacionRoutes);
app.use('/api/comentarios', comentarioRoutes); 


app.get('/', (req, res) => {
    res.json({ message: "Opinion Management System Running" });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});