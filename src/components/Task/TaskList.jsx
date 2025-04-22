import { useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import TaskItem from './TaskItem';
import LoadingSpinner from '../UI/LoadingSpinner';

const TaskList = ({ tasks, isLoading, error, onToggleStatus, onDelete }) => {
  const [processingTasks, setProcessingTasks] = useState([]);
  
  const handleToggleStatus = async (taskId) => {
    setProcessingTasks(prev => [...prev, taskId]);
    await onToggleStatus(taskId);
    setProcessingTasks(prev => prev.filter(id => id !== taskId));
  };
  
  const handleDelete = async (taskId) => {
    setProcessingTasks(prev => [...prev, taskId]);
    await onDelete(taskId);
    setProcessingTasks(prev => prev.filter(id => id !== taskId));
  };
  
  if (isLoading && tasks.length === 0) {
    return <LoadingSpinner message="Loading tasks..." />;
  }
  
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }
  
  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No tasks found.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Add a new task to get started!
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          isProcessing={processingTasks.includes(task.id)}
        />
      ))}
    </Box>
  );
};

export default TaskList;