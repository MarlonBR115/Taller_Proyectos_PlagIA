import { useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token, setToken }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Por favor, selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('documento', file);

    try {
      const response = await axios.post('/api/documentos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      setMessage(`¡Éxito! ${response.data.message}`);
    } catch (error) {
      setMessage('Error al subir el archivo.');
      console.error('Error de subida:', error);
    }
  };
  
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };


  return (
    <div className="dashboard">
      <h2>Panel de Control</h2>
      <p>Sube un documento para analizar</p>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Subir y Analizar</button>
      </div>
       <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Dashboard;