import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // GET - Listar todas as tarefas
  getAllTasks: () => api.get('/tasks'),
  
  // GET - Listar tarefas por status
  getTasksByStatus: (status) => api.get(`/tasks/status/${status}`),
  
  // GET - Buscar tarefa por ID
  getTaskById: (id) => api.get(`/tasks/${id}`),
  
  // POST - Criar nova tarefa
  createTask: (task) => api.post('/tasks', task),
  
  // PUT - Atualizar tarefa
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  
  // DELETE - Deletar tarefa
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  
  // GET - Estatísticas
  getStats: () => api.get('/tasks/stats'),
  
  // GET - Tarefas por categoria
  getPendingTasks: () => api.get('/tasks/pending'),
  getInProgressTasks: () => api.get('/tasks/in-progress'),
  getCompletedTasks: () => api.get('/tasks/completed'),
};

export default api; 