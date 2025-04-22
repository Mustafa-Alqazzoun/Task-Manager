import { Button, ButtonGroup, Box, Typography } from '@mui/material';

const TaskFilter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'pending', label: 'Pending' },
    { value: 'active', label: 'Active' },
    { value: 'finished', label: 'Finished' }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Filter Tasks:
      </Typography>
      <ButtonGroup variant="outlined" color="primary">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            variant={currentFilter === filter.value ? 'contained' : 'outlined'}
          >
            {filter.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default TaskFilter;