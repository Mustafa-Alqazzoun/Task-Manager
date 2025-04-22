import { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Tooltip
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import CircleIcon from '@mui/icons-material/Circle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../../context/ThemeContext';

const themeColors = {
  blue: '#1976d2',
  lavender: '#7e57c2',
  mint: '#26a69a',
  peach: '#ff8a65',
  rose: '#ec407a',
  dark: '#121212'
};

const ThemeSelector = () => {
  const { currentTheme, changeTheme, availableThemes } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (themeId) => {
    changeTheme(themeId);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Change theme">
        <IconButton 
          color="inherit" 
          onClick={handleClick}
          aria-controls={open ? 'theme-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-button',
        }}
      >
        {availableThemes.map((theme) => (
          <MenuItem 
            key={theme.id} 
            onClick={() => handleThemeChange(theme.id)}
            selected={currentTheme === theme.id}
          >
            <ListItemIcon>
              {theme.id === 'dark' ? (
                <DarkModeIcon sx={{ color: themeColors[theme.id] }} />
              ) : (
                <CircleIcon sx={{ color: themeColors[theme.id] }} />
              )}
            </ListItemIcon>
            <ListItemText>{theme.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ThemeSelector;