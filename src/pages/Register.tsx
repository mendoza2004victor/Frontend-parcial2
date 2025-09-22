// src/pages/Register.tsx
import { useState, useContext } from 'react';
import type { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import type { User } from '../types/types';

const Register: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user as User);
        navigate('/tasks');
      } else {
        setError(data.message || 'Error en registro');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
      }}
    >
      <Card
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1E1E1E' }}
          >
            Registro
          </Typography>
          {error && (
            <Typography
              color="error"
              align="center"
              sx={{ mb: 2, fontWeight: 'medium' }}
            >
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <TextField
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#6B73FF' },
                  '&:hover fieldset': { borderColor: '#000DFF' },
                  '&.Mui-focused fieldset': { borderColor: '#000DFF' },
                },
              }}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#6B73FF' },
                  '&:hover fieldset': { borderColor: '#000DFF' },
                  '&.Mui-focused fieldset': { borderColor: '#000DFF' },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#6B73FF' },
                  '&:hover fieldset': { borderColor: '#000DFF' },
                  '&.Mui-focused fieldset': { borderColor: '#000DFF' },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#6B73FF',
                '&:hover': { backgroundColor: '#000DFF' },
                color: '#fff',
                fontWeight: 'bold',
                py: 1.5,
              }}
            >
              Registrar
            </Button>
          </form>
          <Typography align="center" sx={{ mt: 3, color: '#333' }}>
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              style={{
                color: '#6B73FF',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#000DFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6B73FF')}
            >
              Inicia sesión
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
