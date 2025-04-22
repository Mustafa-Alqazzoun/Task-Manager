import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { format } from 'date-fns';

const statusColors = {
  pending: 'warning',
  active: 'info',
  finished: 'success'
};

const statusIcons = {
  pending: '⏳',
  active: '🔥',
  finished: '✔️'
};

const TaskItem = ({ task, onToggleStatus, onDelete, isProcessing }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const theme = useTheme();
  
  const handleToggleStatus = () => {
    if (!isProcessing) {
      onToggleStatus(task.id);
    }
  };
  
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    onDelete(task.id);
    setDeleteDialogOpen(false);
  };
  
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };
  
  // Format deadline date
  const formattedDeadline = format(new Date(task.deadline), 'MMM d, yyyy h:mm a');
  
  // Calculate if task is past deadline
  const isPastDeadline = new Date(task.deadline) < new Date() && task.status !== 'finished';

  // Get the next status label
  const getNextStatusLabel = () => {
    switch(task.status) {
      case 'pending': return 'Mark Active';
      case 'active': return 'Mark Finished';
      case 'finished': return 'Mark Pending';
      default: return 'Change Status';
    }
  };

  return (
    <>
      <Card 
        sx={{ 
          mb: 2, 
          borderLeft: isPastDeadline ? '4px solid #f44336' : `4px solid ${theme.palette.primary.main}`,
          opacity: task.status === 'finished' ? 0.8 : 1,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 3,
            transform: 'translateY(-2px)'
          }
        }}
        elevation={2}
      >
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{ 
                textDecoration: task.status === 'finished' ? 'line-through' : 'none',
                mb: 1,
                color: theme.palette.text.primary
              }}
            >
              {task.name}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              {task.description}
            </Typography>
            
            {/* Bottom section with status on left and buttons on right */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mt: 'auto',
              pt: 1
            }}>
              {/* Left side - deadline and status */}
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                <Chip 
                  label={`Deadline: ${formattedDeadline}`}
                  color={isPastDeadline ? 'error' : 'default'}
                  size="small"
                />
                
                <Chip 
                  icon={<span>{statusIcons[task.status]}</span>}
                  label={task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  color={statusColors[task.status]}
                  size="small"
                />
              </Box>
              
              {/* Right side - action buttons */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {isProcessing ? (
                  <CircularProgress size={24} color="primary" />
                ) : (
                  <>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="small"
                      startIcon={<PlaylistAddCheckIcon />}
                      onClick={handleToggleStatus}
                    >
                      {getNextStatusLabel()}
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      color="error" 
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={handleDeleteClick}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        PaperProps={{
          sx: {
            bgcolor: theme.palette.background.paper,
            borderRadius: 2
          }
        }}
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{task.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;