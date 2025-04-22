import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication services
export const authService = {
  login: async (email, password) => {
    // In a real app, we would send a request to a real auth endpoint
    // For this demo, we're using the users array in our json-server
    const response = await api.get(`/users?email=${email}`);
    const user = response.data[0];
    
    if (user && user.password === password) {
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
  }
};

// Task services
export const taskService = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  
  // Get tasks by status
  getTasksByStatus: async (status) => {
    const response = await api.get(`/tasks?status=${status}`);
    return response.data;
  },
  
  // Add new task
  addTask: async (task) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },
  
  // Update task status
  updateTaskStatus: async (id, status) => {
    const response = await api.patch(`/tasks/${id}`, { status });
    return response.data;
  },
  
  // Delete task
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
    return { success: true, id };
  }
};

export default api;