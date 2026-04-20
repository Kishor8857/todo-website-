import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskAPI = {
  // Task endpoints
  getTasks: () => api.get('/tasks/'),
  getTask: (id) => api.get(`/tasks/${id}/`),
  createTask: (data) => api.post('/tasks/', data),
  updateTask: (id, data) => api.patch(`/tasks/${id}/`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}/`),
  completeTask: (id) => api.post(`/tasks/${id}/complete_task/`),
  deleteTaskToTrash: (id) => api.post(`/tasks/${id}/delete_task/`),
  completeAllTasks: () => api.post('/tasks/complete_all/'),

  // Complete endpoints
  getCompletedTasks: () => api.get('/completed/'),
  getCompletedTask: (id) => api.get(`/completed/${id}/`),
  deleteCompleted: (id) => api.post(`/completed/${id}/delete_task/`),
  restoreFromCompleted: (id) => api.post(`/completed/${id}/restore_task/`),
  deleteAllCompleted: () => api.post('/completed/delete_all/'),

  // Trash endpoints
  getTrashTasks: () => api.get('/trash/'),
  getTrashTask: (id) => api.get(`/trash/${id}/`),
  permanentlyDeleteTask: (id) => api.post(`/trash/${id}/delete_task/`),
  restoreFromTrash: (id) => api.post(`/trash/${id}/restore_task/`),
  deleteAllTrash: () => api.post('/trash/delete_all/'),
  restoreAllFromTrash: () => api.post('/trash/restore_all/'),
};

export default api;
