import { AppBar, Toolbar, Typography, Button, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeSelector from '../UI/ThemeSelector';

const Header = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddNewTask = () => {
    navigate('/add-task');
  };

  const handleGoToDashboard = () => {
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={handleGoToDashboard}
        >
          Task Manager
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user && (
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user.username || user.email}
            </Typography>
          )}
          
          <ThemeSelector />
          
          <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
          
          <Button 
            color="inherit" 
            onClick={handleAddNewTask}
            sx={{ mx: 1 }}
          >
            Add New Task
          </Button>
          
          <Button 
            color="inherit" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;