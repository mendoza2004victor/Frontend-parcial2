// src/pages/Tasks.tsx
import { useState, useEffect, useContext } from 'react';
import type { FC } from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import { getTasks, createTask, toggleTaskDone, deleteTask } from '../api/task';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../types/types';

const Tasks: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err: any) {
      if (err.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError(err.message || 'Error al cargar tareas');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (task: { title: string }) => {
    const newTask = await createTask(task);
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggle = async (id: number) => {
    await toggleTaskDone(id);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading)
    return (
      <Typography align="center" sx={{ mt: 8, color: '#fff' }}>
        Cargando...
      </Typography>
    );
  if (error)
    return (
      <Typography align="center" color="error" sx={{ mt: 8 }}>
        {error}
      </Typography>
    );

  return (
    <div
      className="min-h-screen p-4 flex flex-col items-center"
      style={{
        background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
      }}
    >
      <Card
        sx={{
          mb: 6,
          width: '100%',
          maxWidth: 600,
          borderRadius: 3,
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <CardContent className="flex justify-between items-center">
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Tus Tareas
          </Typography>
          <Button
            variant="contained"
            color="error"
            sx={{ fontWeight: 'bold' }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>

      <TaskForm onCreate={handleCreate} />

      {tasks.length === 0 ? (
        <Typography align="center" sx={{ mt: 8, color: '#fff', fontSize: 18 }}>
          No tienes tareas aún.
        </Typography>
      ) : (
        <ul className="space-y-3 w-full max-w-md">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => handleToggle(task.id)}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
