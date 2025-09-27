import { useState } from 'react';
import axios from 'axios';

const Register = ({ setToken, setView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('docente'); // Valor por defecto
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', {
        nombre_completo: name,
        correo_electronico: email,
        contrasena: password,
        rol: role,
      });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError('No se pudo completar el registro. Inténtalo de nuevo.');
      console.error('Error en el registro:', err);
    }
  };

  return (
    <div className="auth-form">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="docente">Docente</option>
          <option value="administrador">Administrador</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        ¿Ya tienes una cuenta?{' '}
        <button className="link-button" onClick={() => setView('login')}>
          Inicia Sesión
        </button>
      </p>
    </div>
  );
};

export default Register;