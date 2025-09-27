import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [view, setView] = useState('login'); // 'login', 'register'

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  if (token) {
    return <Dashboard token={token} setToken={setToken} />;
  }

  return (
    <div className="App">
      {view === 'login' ? (
        <Login setToken={setToken} setView={setView} />
      ) : (
        <Register setToken={setToken} setView={setView} />
      )}
    </div>
  );
}

export default App;