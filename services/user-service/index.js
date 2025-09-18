const express = require('express');
require('dotenv').config(); // Para usar variables de entorno del archivo .env

const app = express();
const PORT = process.env.PORT || 3001; // El puerto para este microservicio

// Middleware para entender JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡API del Servicio de Usuarios funcionando! 👋');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`🚀 UserService escuchando en http://localhost:${PORT}`);
});