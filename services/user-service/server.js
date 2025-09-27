// server.js
import express from 'express';
import 'dotenv/config'; 
import db from './config/db.js'; 

// 1. Importar Rutas existentes
import userRoutes from './routes/usuarios.routes.js'; 
// 2. Importar nuevas Rutas
import documentosRoutes from './routes/documentos.routes.js';
import analisisRoutes from './routes/analisis.routes.js';
import authRoutes from './routes/auth.routes.js'; // <-- Nuevo
import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 

// Middleware para servir los archivos estáticos del frontend construido
app.use(express.static(path.join(__dirname, '../../frontend-web/dist')));

// Conexión a la base de datos (Ejemplo: verifica si el pool está vivo)
db.connect()
    .then(() => console.log('Conexión a PostgreSQL establecida con éxito.'))
    .catch(err => console.error('Error al conectar con PostgreSQL:', err.stack));

// Rutas de prueba inicial
app.get('/', (req, res) => {
    res.send('API de Análisis de Documentos con IA y PostgreSQL.');
});

// Uso de Rutas
app.use('/api/auth', authRoutes); // <-- Nuevo: Rutas de autenticación
app.use('/api/usuarios', userRoutes);
app.use('/api/documentos', documentosRoutes); // Agregamos la ruta de documentos
app.use('/api/analisis', analisisRoutes); // Agregamos la ruta de análisis y reportes

// Catch-all para servir index.html para cualquier otra petición (manejo de rutas de React)
app.get(/^(?!\/api)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend-web/dist', 'index.html'));
  });

// Inicia el servidor
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Servidor Express corriendo en http://${HOST}:${PORT}`);
});