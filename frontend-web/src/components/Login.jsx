import { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken, setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        correo_electronico: email,
        contrasena: password,
      });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      console.error('Error en el login:', err);
    }
  };

  return (
    <div className="auth-form">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        ¿No tienes una cuenta?{' '}
        <button className="link-button" onClick={() => setView('register')}>
          Regístrate
        </button>
      </p>
    </div>
  );
};

export default Login;