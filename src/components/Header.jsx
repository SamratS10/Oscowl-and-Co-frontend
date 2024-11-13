import React from 'react';
import { Box,AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Header = ({ onMenuClick }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page after logout
};
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:"#000000" }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          TODO App
        </Typography>
        <Box sx={{textAlign:"right",width:"100%"}}>
          <Button onClick={handleLogout} sx={{backgroundColor:"blue",color:"white"}}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
