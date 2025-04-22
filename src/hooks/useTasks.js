import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch all tasks for the current user
  const fetchTasks = useCallback(async () => {
    if (!user) return; // Don't fetch if no user is logged in
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
      applyFilter(currentFilter, data);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentFilter, user]);

  // Apply filter function
  const applyFilter = useCallback((filter, tasksToFilter = tasks) => {
    setCurrentFilter(filter);
    
    if (filter === 'all') {
      setFilteredTasks(tasksToFilter);
    } else {
      setFilteredTasks(tasksToFilter.filter(task => task.status === filter));
    }
  }, [tasks]);

  // Add a new task
  const addTask = async (newTask) => {
    setIsLoading(true);
    setError(null);
    try {
      const taskWithId = {
        ...newTask,
        id: Date.now().toString(),
        status: 'pending',
        userId: user.id
      };
      
      const addedTask = await taskService.addTask(taskWithId);
      
      setTasks(prev => [...prev, addedTask]);
      applyFilter(currentFilter, [...tasks, addedTask]);
      return { success: true, task: addedTask };
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle task status (pending -> active -> finished -> pending)
  const toggleTaskStatus = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      
      // Cycle through statuses: pending -> active -> finished -> pending
      const statusMap = {
        'pending': 'active',
        'active': 'finished',
        'finished': 'pending'
      };
      
      const newStatus = statusMap[task.status] || 'pending';
      
      const updatedTask = await taskService.updateTaskStatus(id, newStatus);
      
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
      applyFilter(currentFilter, tasks.map(t => t.id === id ? updatedTask : t));
      return { success: true, task: updatedTask };
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await taskService.deleteTask(id);
      
      setTasks(prev => prev.filter(task => task.id !== id));
      applyFilter(currentFilter, tasks.filter(task => task.id !== id));
      return { success: true };
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [fetchTasks, user]);

  return {
    tasks: filteredTasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    toggleTaskStatus,
    deleteTask,
    applyFilter,
    currentFilter
  };
};

export default useTasks;