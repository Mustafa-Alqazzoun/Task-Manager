import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import TaskForm from './components/Task/TaskForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Wrapper component to access theme context
const ThemedApp = () => {
  const { themeData } = useTheme();
  const theme = createTheme({
    palette: themeData.palette,
  });

  const { isAuthenticated } = useAuth();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" /> : <Login />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/" /> : <Register />
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/add-task" element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          } />
          {/* Redirect to login instead of dashboard if not authenticated */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </div>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;