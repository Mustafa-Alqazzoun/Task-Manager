import { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import Header from '../UI/Header';
import TaskList from '../Task/TaskList';
import TaskFilter from './TaskFilter';
import useTasks from '../../hooks/useTasks';

const Dashboard = () => {
  const { 
    tasks, 
    isLoading, 
    error, 
    fetchTasks, 
    toggleTaskStatus, 
    deleteTask, 
    applyFilter, 
    currentFilter 
  } = useTasks();
  
  const [refreshing, setRefreshing] = useState(false);
  
  const handleFilterChange = (filter) => {
    applyFilter(filter);
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTasks();
    setRefreshing(false);
  };

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h4" component="h1">
            My Tasks
          </Typography>
          
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={isLoading || refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Box>
        
        <TaskFilter 
          currentFilter={currentFilter} 
          onFilterChange={handleFilterChange} 
        />
        
        <TaskList 
          tasks={tasks}
          isLoading={isLoading}
          error={error}
          onToggleStatus={toggleTaskStatus}
          onDelete={deleteTask}
        />
      </Container>
    </>
  );
};

export default Dashboard;